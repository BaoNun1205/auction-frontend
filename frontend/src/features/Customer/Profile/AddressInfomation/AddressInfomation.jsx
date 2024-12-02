import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AppModal from '~/components/Modal/Modal';
import AddressForm from '../components/AddressForm/AddressForm';
import AddressUpdateForm from '../components/AddressForm/AddressUpdateForm';
import {
  StyledPaper,
  AddressItem,
  StyledButton,
  StyledChip,
  StyledLink,
  StyledOutlinedButton,
} from './style';

// Hook để lấy địa chỉ của người dùng
import { useGetAddressByUserId } from '~/hooks/addressHook';
import { useAppStore } from '~/store/appStore';

const AddressesInfomation = () => {
  const { auth } = useAppStore();
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Gọi hook để lấy dữ liệu địa chỉ của người dùng
  const { data: addresses, isLoading, isError, error, refetch } = useGetAddressByUserId(auth.user.id);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <Alert severity="error">{error.message}</Alert>
      </Box>
    );
  }

  // Sắp xếp địa chỉ để các địa chỉ mặc định (isDefault = true) lên đầu
  const sortedAddresses = addresses?.sort((a, b) => {
    return b.isDefault ? 1 : a.isDefault ? -1 : 0;
  });

  return (
    <StyledPaper elevation={0}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Địa chỉ của tôi
        </Typography>
        <AppModal
          trigger={
            <StyledButton
              variant="contained"
              startIcon={<AddIcon />}
            >
              Thêm địa chỉ mới
            </StyledButton>
          }
          maxWidth={600}
        >
          <AddressForm refresh={refetch} />
        </AppModal>
      </Box>

      <Box>
        {sortedAddresses && sortedAddresses.length > 0 ? (
          sortedAddresses.map((address) => (
            <AddressItem key={address.addressId}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {address.recipientName}
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography color="text.secondary">{address.phone}</Typography>
                  </Box>
                  <Typography color="text.secondary" sx={{ mb: 1 }}>
                    {address.addressDetail}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 1 }}>
                    {address.ward}, {address.district}, {address.province}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {address.isDefault && (
                      <StyledChip label="Mặc định" size="small" />
                    )}
                    {address.tags?.map((tag, index) => (
                      <StyledChip key={index} label={tag} size="small" />
                    ))}
                  </Stack>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  {/* Open Modal for updating address */}
                  <AppModal
                    trigger={<button onClick={() => setSelectedAddress(address)}>Cập nhật</button>}
                    maxWidth={600}
                  >
                    <AddressUpdateForm
                      refresh={refetch}
                      address={selectedAddress} // Pass the selected address for editing
                    />
                  </AppModal>
                  <StyledLink href="#">Xóa</StyledLink>
                  {!address.isDefault && (
                    <StyledOutlinedButton variant="outlined" size="small">
                      Thiết lập mặc định
                    </StyledOutlinedButton>
                  )}
                </Box>
              </Box>
            </AddressItem>
          ))
        ) : (
          <Typography color="text.secondary">Không có địa chỉ nào.</Typography>
        )}
      </Box>
    </StyledPaper>
  );
};

export default AddressesInfomation;

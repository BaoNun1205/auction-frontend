import React from 'react';
import {
  Box,
  Typography,
  Divider,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AppModal from '~/components/Modal/Modal';
import AddressForm from '../components/AddressForm/AddressForm';
import {
  StyledPaper,
  AddressItem,
  StyledButton,
  StyledChip,
  StyledLink,
  StyledOutlinedButton,
} from './style';

const AddressesInfomation = () => {
  const addresses = [
    {
      id: 1,
      name: 'Lê Nguyễn Bảo',
      phone: '(+84) 375 969 227',
      address: 'Ktx D2, 484 Đường Lê Văn Việt',
      district: 'Phường Tăng Nhơn Phú A, Thành Phố Thủ Đức, TP. Hồ Chí Minh',
      isDefault: true,
      tags: [],
    },
    {
      id: 2,
      name: 'Lê Nguyễn Bảo',
      phone: '(+84) 375 969 227',
      address: 'Tân Vinh - Xuân Sơn Nam - Đồng Xuân - Phú Yên',
      district: 'Xã Xuân Sơn Nam, Huyện Đồng Xuân, Phú Yên',
      isDefault: false,
      tags: ['Địa chỉ lấy hàng', 'Địa chỉ trả hàng'],
    },
    {
      id: 3,
      name: 'Lê Nguyễn Bảo',
      phone: '(+84) 375 969 227',
      address: 'Chung Cư Phúc Đạt Tower, Số 159, Quốc Lộ 1k',
      district: 'Phường Đông Hòa, Thành Phố Dĩ An, Bình Dương',
      isDefault: false,
      tags: [],
    },
  ];

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
          <AddressForm />
        </AppModal>
      </Box>

      <Box>
        {addresses.map((address) => (
          <AddressItem key={address.id}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {address.name}
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography color="text.secondary">{address.phone}</Typography>
                </Box>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  {address.address}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  {address.district}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {address.isDefault && (
                    <StyledChip label="Mặc định" size="small" />
                  )}
                  {address.tags.map((tag, index) => (
                    <StyledChip key={index} label={tag} size="small" />
                  ))}
                </Stack>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <StyledLink href="#">
                  Cập nhật
                </StyledLink>
                <StyledLink href="#">
                  Xóa
                </StyledLink>
                {!address.isDefault && (
                  <StyledOutlinedButton variant="outlined" size="small">
                    Thiết lập mặc định
                  </StyledOutlinedButton>
                )}
              </Box>
            </Box>
          </AddressItem>
        ))}
      </Box>
    </StyledPaper>
  );
};

export default AddressesInfomation;
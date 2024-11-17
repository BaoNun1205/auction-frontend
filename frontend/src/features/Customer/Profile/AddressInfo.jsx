import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Stack,
  Divider,
  IconButton,
  Link,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import AddressForm from './components/AddressForm';
import AppModal from '~/components/Modal/Modal';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 1200,
  margin: '0 auto',
  marginTop: theme.spacing(4),
}));

const AddressItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const AddressesInfo = () => {
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
                <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: '#ee4d2d',
            '&:hover': {
              bgcolor: '#d73211',
            },
          }}
        >
          Thêm địa chỉ mới
        </Button>
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
                    <Chip
                      label="Mặc định"
                      size="small"
                      sx={{
                        color: '#ee4d2d',
                        bgcolor: '#fff',
                        border: '1px solid #ee4d2d',
                      }}
                    />
                  )}
                  {address.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      sx={{
                        color: '#ee4d2d',
                        bgcolor: '#fff',
                        border: '1px solid #ee4d2d',
                      }}
                    />
                  ))}
                </Stack>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Link
                  href="#"
                  underline="none"
                  sx={{ color: '#1976d2', fontSize: '0.875rem' }}
                >
                  Cập nhật
                </Link>
                <Link
                  href="#"
                  underline="none"
                  sx={{ color: '#1976d2', fontSize: '0.875rem' }}
                >
                  Xóa
                </Link>
                {!address.isDefault && (
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: '#595959',
                      color: '#595959',
                      '&:hover': {
                        borderColor: '#404040',
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    Thiết lập mặc định
                  </Button>
                )}
              </Box>
            </Box>
          </AddressItem>
        ))}
      </Box>
    </StyledPaper>
  );
};

export default AddressesInfo;
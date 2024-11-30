import React, { useState } from 'react';
import { 
  Box, Typography, Tabs, Tab, Card, CardMedia, CardContent, 
  CardActions, Button, Modal, Chip, Grid, styled, Paper,
  Container, useTheme, useMediaQuery
} from '@mui/material';
import { 
  LocalShipping, Inventory, CheckCircle, 
  ShoppingCart, ListAlt, Timer, Gavel, Close
} from '@mui/icons-material';

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: '0.9rem',
  minWidth: 100,
  '&.Mui-selected': {
    color: theme.palette.error.main,
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const InfoChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  '& .MuiChip-icon': {
    color: 'inherit',
  },
}));

const AuctionModal = ({ open, handleClose, item }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (!item) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="auction-details-modal"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: fullScreen ? '100%' : 600,
        maxHeight: '90vh',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2" color="error" fontWeight="bold">
            Chi tiết đấu giá
          </Typography>
          <Button onClick={handleClose} sx={{ minWidth: 'auto', p: 0.5 }}>
            <Close />
          </Button>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CardMedia
              component="img"
              height="250"
              image={item.imgSrc}
              alt={item.auctionName}
              sx={{ borderRadius: 1, objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              {item.auctionName}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Giá trúng thầu: {item.bidAmount.toLocaleString()} VNĐ
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Ngày đấu giá: {item.auctionDate}
            </Typography>
            <InfoChip
              icon={<Gavel />}
              label="Đã thắng đấu giá"
              color="success"
              sx={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Thông tin chi tiết
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Thông tin chi tiết về sản phẩm đấu giá sẽ được hiển thị ở đây,
              bao gồm tình trạng, thông tin vận chuyển và chi tiết người bán.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

const WonItems = () => {
  const [tab, setTab] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const auctionImg = "/placeholder.svg?height=200&width=300";
  const exampleData = [
    {
      id: 1,
      auctionName: "Xe cổ điển",
      imgSrc: auctionImg,
      auctionDate: "10/07 10:00",
      bidAmount: 100000000,
      status: "preparing"
    },
    {
      id: 2,
      auctionName: "Sách cổ hiếm",
      imgSrc: auctionImg,
      auctionDate: "15/07 09:00",
      bidAmount: 25000000,
      status: "delivering"
    },
    {
      id: 3,
      auctionName: "Bộ sưu tập đồng hồ cao cấp",
      imgSrc: auctionImg,
      auctionDate: "20/07 14:00",
      bidAmount: 75000000,
      status: "received"
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleOpenDetails = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      preparing: { icon: <Inventory />, label: 'Đang chuẩn bị', color: 'warning' },
      delivering: { icon: <LocalShipping />, label: 'Đang giao hàng', color: 'info' },
      received: { icon: <CheckCircle />, label: 'Đã nhận hàng', color: 'success' },
      purchased: { icon: <ShoppingCart />, label: 'Đã mua', color: 'secondary' },
    };
    const config = statusConfig[status] || statusConfig.purchased;
    
    return (
      <InfoChip
        icon={config.icon}
        label={config.label}
        color={config.color}
        size="small"
      />
    );
  };

  const filteredData = tab === 0 ? exampleData : exampleData.filter(item => item.status === Object.keys(getStatusChip({}))[tab - 1]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '100%', py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Chiến lợi phẩm
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Lưu trữ các vật phẩm đã thắng trong các phiên đấu giá
        </Typography>

        <Paper elevation={0} sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            textColor="inherit"
            TabIndicatorProps={{ sx: { bgcolor: 'error.main' } }}
          >
            <StyledTab icon={<ListAlt />} label="Tất cả" />
            <StyledTab icon={<Inventory />} label="Đang chuẩn bị" />
            <StyledTab icon={<LocalShipping />} label="Đang giao" />
            <StyledTab icon={<CheckCircle />} label="Đã nhận" />
            <StyledTab icon={<ShoppingCart />} label="Đã mua" />
          </Tabs>
        </Paper>

        <Box sx={{ mt: 3 }}>
          {filteredData.map((item) => (
            <StyledCard key={item.id}>
              <CardMedia
                component="img"
                sx={{ width: 200, height: 200, objectFit: 'cover' }}
                image={item.imgSrc}
                alt={item.auctionName}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2 }}>
                <CardContent sx={{ flex: '1 0 auto', p: 0 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {item.auctionName}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    Giá trúng thầu: {item.bidAmount.toLocaleString()} VNĐ
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Timer color="action" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      Ngày đấu giá: {item.auctionDate}
                    </Typography>
                  </Box>
                  {getStatusChip(item.status)}
                </CardContent>
                <CardActions sx={{ mt: 'auto', justifyContent: 'flex-end', p: 0 }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => handleOpenDetails(item)}
                    sx={{ mt: 2 }}
                  >
                    Xem chi tiết
                  </Button>
                </CardActions>
              </Box>
            </StyledCard>
          ))}
        </Box>

        <AuctionModal 
          open={Boolean(selectedItem)} 
          handleClose={handleCloseDetails}
          item={selectedItem}
        />
      </Box>
    </Container>
  );
};

export default WonItems;
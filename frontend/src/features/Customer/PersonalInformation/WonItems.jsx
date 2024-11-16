import React, { useState } from 'react';
import { 
  Box, Typography, Tabs, Tab, Card, CardMedia, CardContent, 
  CardActions, Button, Modal, Chip, Grid, styled, Paper
} from '@mui/material';
import { 
  LocalShipping, Inventory, CheckCircle, 
  ShoppingCart, ListAlt, Timer, Gavel 
} from '@mui/icons-material';

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: '1rem',
  minWidth: 120,
  '&.Mui-selected': {
    color: theme.palette.error.main,
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const AuctionModal = ({ open, handleClose, item }) => {
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
        width: { xs: '90%', sm: 600 },
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h5" component="h2" gutterBottom color="error">
          Auction Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CardMedia
              component="img"
              height="200"
              image={item.imgSrc}
              alt={item.auctionName}
              sx={{ borderRadius: 1, objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              {item.auctionName}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Winning Bid: ${item.bidAmount}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Auction Date: {item.auctionDate}
            </Typography>
            <Chip
              icon={<Gavel />}
              label="Auction Won"
              color="success"
              sx={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Item Details
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Additional details about the auction item would be displayed here,
              including condition, shipping information, and seller details.
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose}>Close</Button>
        </Box>
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
      auctionName: "Vintage Car Auction",
      imgSrc: auctionImg,
      auctionDate: "07-10 10:00 AM",
      bidAmount: 100000,
      status: "preparing"
    },
    {
      id: 2,
      auctionName: "Rare Book Auction",
      imgSrc: auctionImg,
      auctionDate: "07-15 9:00 AM",
      bidAmount: 25000,
      status: "delivering"
    },
    {
      id: 3,
      auctionName: "Luxury Watch Collection",
      imgSrc: auctionImg,
      auctionDate: "07-20 2:00 PM",
      bidAmount: 75000,
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
      preparing: { icon: <Inventory />, label: 'Being Prepared', color: 'warning' },
      delivering: { icon: <LocalShipping />, label: 'Delivering', color: 'info' },
      received: { icon: <CheckCircle />, label: 'Received', color: 'success' },
      purchased: { icon: <ShoppingCart />, label: 'Purchased', color: 'secondary' },
    };
    const config = statusConfig[status] || statusConfig.purchased;
    
    return (
      <Chip
        icon={config.icon}
        label={config.label}
        color={config.color}
        size="small"
      />
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        color="error" 
        gutterBottom 
        sx={{ fontWeight: 'bold', mb: 4 }}
      >
        Won Items
      </Typography>

      <Paper elevation={0} sx={{ mb: 3 }}>
        <Tabs 
          value={tab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="inherit"
          TabIndicatorProps={{ sx: { bgcolor: 'error.main' } }}
        >
          <StyledTab icon={<ListAlt />} label="All Orders" />
          <StyledTab icon={<Inventory />} label="Being Prepared" />
          <StyledTab icon={<LocalShipping />} label="Delivering" />
          <StyledTab icon={<CheckCircle />} label="Received" />
          <StyledTab icon={<ShoppingCart />} label="Purchased" />
        </Tabs>
      </Paper>

      <Box sx={{ mt: 3 }}>
        {exampleData.map((item) => (
          <StyledCard key={item.id}>
            <CardMedia
              component="img"
              sx={{ width: 200 }}
              image={item.imgSrc}
              alt={item.auctionName}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.auctionName}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Winning Bid: ${item.bidAmount.toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Timer color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    Auction Date: {item.auctionDate}
                  </Typography>
                </Box>
                {getStatusChip(item.status)}
              </CardContent>
              <CardActions sx={{ mt: 'auto', justifyContent: 'flex-end' }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => handleOpenDetails(item)}
                >
                  View Details
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
  );
};

export default WonItems;
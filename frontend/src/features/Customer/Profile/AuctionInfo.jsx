import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Card, 
  CardMedia, 
  CardContent, 
  Button, 
  Container,
  styled,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton
} from '@mui/material';
import { 
  AccessTime, 
  People, 
  MonetizationOn, 
  Gavel, 
  CalendarToday, 
  HourglassEmpty, 
  Info
} from '@mui/icons-material';
import { useGetRegisteredSession } from '~/hooks/userHook';
import { useAppStore } from '~/store/appStore';

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 'bold',
  '&.Mui-selected': {
    color: '#B7201B',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '3px',
    backgroundColor: '#B7201B',
    transform: 'scaleX(0)',
    transition: 'transform 0.3s ease',
  },
  '&.Mui-selected::after': {
    transform: 'scaleX(1)',
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const InfoChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  '& .MuiChip-icon': {
    color: 'inherit',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#B7201B',
  color: 'white',
  padding: '8px 24px',
  borderRadius: '25px',
  '&:hover': {
    backgroundColor: '#8B1815',
  },
}));

const AuctionRegisteredItem = ({ auctionName, imgSrc, startTime, endTime, startingPrice, registrants }) => {
  return (
    <StyledCard>
      <CardMedia
        component="img"
        sx={{ width: { xs: '100%', sm: 300 }, height: { xs: 200, sm: 'auto' } }}
        image={imgSrc || "/placeholder.svg?height=200&width=200"}
        alt={auctionName}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 3 }}>
        <CardContent sx={{ flex: '1 0 auto', p: 0 }}>
          <Typography variant="h5" component="h2" sx={{ color: '#B7201B', fontWeight: 'bold', mb: 2 }}>
            {auctionName}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
            <InfoChip icon={<CalendarToday />} label={`Bắt đầu: ${new Date(startTime).toLocaleString('vi-VN')}`} />
            <InfoChip icon={<HourglassEmpty />} label={`Kết thúc: ${new Date(endTime).toLocaleString('vi-VN')}`} />
            <InfoChip icon={<People />} label={`Số người đăng ký: ${registrants}`} color="secondary" />
            <InfoChip icon={<MonetizationOn />} label={`Giá khởi điểm: ${startingPrice.toLocaleString('vi-VN')} VNĐ`} color="primary" />
          </Box>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Tooltip title="Xem thông tin chi tiết về phiên đấu giá">
            <IconButton color="primary">
              <Info />
            </IconButton>
          </Tooltip>
          <ActionButton variant="contained">
            Hủy đăng ký
          </ActionButton>
        </Box>
      </Box>
    </StyledCard>
  );
};

const AuctionParticipatedItem = ({ productName, imgSrc, auctionStartTime, auctionEndTime, participants, startingPrice, winningPrice, auctionHistory }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledCard>
      <CardMedia
        component="img"
        sx={{ width: { xs: '100%', sm: 300 }, height: { xs: 200, sm: 'auto' } }}
        image={imgSrc || "/placeholder.svg?height=200&width=200"}
        alt={productName}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 3 }}>
        <CardContent sx={{ flex: '1 0 auto', p: 0 }}>
          <Typography variant="h5" component="h2" sx={{ color: '#B7201B', fontWeight: 'bold', mb: 2 }}>
            {productName}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
            <InfoChip icon={<CalendarToday />} label={`Bắt đầu: ${new Date(auctionStartTime).toLocaleString('vi-VN')}`} />
            <InfoChip icon={<HourglassEmpty />} label={`Kết thúc: ${new Date(auctionEndTime).toLocaleString('vi-VN')}`} />
            <InfoChip icon={<People />} label={`Số người tham gia: ${participants}`} />
            <InfoChip icon={<MonetizationOn />} label={`Giá khởi điểm: ${startingPrice.toLocaleString('vi-VN')} VNĐ`} color="primary" />
            <InfoChip icon={<Gavel />} label={`Giá đấu thắng: ${winningPrice.toLocaleString('vi-VN')} VNĐ`} color="success" />
          </Box>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <ActionButton onClick={handleClickOpen}>
            Xem chi tiết
          </ActionButton>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="auction-history-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="auction-history-dialog-title" sx={{ bgcolor: '#f5f5f5', color: '#B7201B' }}>
          Lịch sử đấu giá: {productName}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
            <Table aria-label="auction history table">
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Thời gian</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Người đấu giá</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Giá đấu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {auctionHistory.map((historyItem, index) => (
                  <TableRow 
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:nth-of-type(odd)': { bgcolor: '#fafafa' } }}
                  >
                    <TableCell>{new Date(historyItem.time).toLocaleString('vi-VN')}</TableCell>
                    <TableCell>{historyItem.bidder}</TableCell>
                    <TableCell align="right" sx={{ color: '#B7201B', fontWeight: 'bold' }}>
                      {historyItem.price.toLocaleString('vi-VN')} VNĐ
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions sx={{ p: 2, bgcolor: '#f5f5f5' }}>
          <Button onClick={handleClose} sx={{ color: '#B7201B', fontWeight: 'bold' }}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </StyledCard>
  );
};

const AuctionInfo = () => {
  const [tab, setTab] = useState(0);
  const auctionImg = './src/assets/images/auctionItem.png';
  const { auth } = useAppStore();

  const exRegisteredData1 = useGetRegisteredSession(auth.user.id);
  console.log('test: ', exRegisteredData1);

  const exRegisteredData = [
    {
      id: 1,
      auctionName: 'Đồng hồ cổ thế kỷ 19',
      imgSrc: auctionImg,
      startTime: '2023-06-01T10:00:00',
      endTime: '2023-06-10T18:00:00',
      startingPrice: 50000000,
      registrants: 8,
    },
    {
      id: 2,
      auctionName: 'Bộ sưu tập tem hiếm',
      imgSrc: auctionImg,
      startTime: '2023-06-15T09:00:00',
      endTime: '2023-06-25T17:00:00',
      startingPrice: 20000000,
      registrants: 15,
    },
  ];

  const exParticipatedData = [
    {
      id: 1,
      productName: 'Tranh sơn dầu "Hoàng hôn trên biển"',
      imgSrc: auctionImg,
      auctionStartTime: '2023-05-15T14:00:00',
      auctionEndTime: '2023-05-15T16:00:00',
      participants: 30,
      startingPrice: 5000000,
      winningPrice: 7500000,
      auctionHistory: [
        { time: '2023-05-15T14:05:00', bidder: 'Nguyễn Văn A', price: 5200000 },
        { time: '2023-05-15T14:10:00', bidder: 'Trần Thị B', price: 5500000 },
        { time: '2023-05-15T14:15:00', bidder: 'Lê Văn C', price: 6000000 },
        { time: '2023-05-15T14:20:00', bidder: 'Phạm Thị D', price: 7000000 },
        { time: '2023-05-15T14:25:00', bidder: 'Hoàng Văn E', price: 7500000 },
      ]
    },
    {
      id: 2,
      productName: 'Tượng đồng cổ "Nữ thần tự do"',
      imgSrc: auctionImg,
      auctionStartTime: '2023-05-20T10:00:00',
      auctionEndTime: '2023-05-20T12:00:00',
      participants: 25,
      startingPrice: 10000000,
      winningPrice: 15000000,
      auctionHistory: [
        { time: '2023-05-20T10:05:00', bidder: 'Đỗ Văn F', price: 10500000 },
        { time: '2023-05-20T10:10:00', bidder: 'Ngô Thị G', price: 11000000 },
        { time: '2023-05-20T10:15:00', bidder: 'Vũ Văn H', price: 12000000 },
        { time: '2023-05-20T10:20:00', bidder: 'Bùi Thị I', price: 13500000 },
        { time: '2023-05-20T10:25:00', bidder: 'Đặng Văn K', price: 15000000 },
      ]
    },
  ];

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Phiên đấu giá
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Lưu trữ các phiên đấu giá đã đăng ký và tham gia
          </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={tab} 
            onChange={handleChange} 
            centered
            TabIndicatorProps={{
              style: {
                backgroundColor: '#B7201B',
              }
            }}
          >
            <StyledTab label="Đã đăng ký" />
            <StyledTab label="Đã tham gia" />
          </Tabs>
        </Box>

        <Box sx={{ mt: 3 }}>
          {tab === 0 ? (
            <Box>
              {exRegisteredData1.map((item) => (
                <AuctionRegisteredItem
                  key={item.id}
                  auctionName={item.auctionName}
                  imgSrc={item.imgSrc}
                  startTime={item.startTime}
                  endTime={item.endTime}
                  startingPrice={item.startingPrice}
                  registrants={item.registrants}
                />
              ))}
            </Box>
          ) : (
            <Box>
              {exParticipatedData.map((item) => (
                <AuctionParticipatedItem
                  key={item.id}
                  productName={item.productName}
                  imgSrc={item.imgSrc}
                  auctionStartTime={item.auctionStartTime}
                  auctionEndTime={item.auctionEndTime}
                  participants={item.participants}
                  startingPrice={item.startingPrice}
                  winningPrice={item.winningPrice}
                  auctionHistory={item.auctionHistory}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default AuctionInfo;
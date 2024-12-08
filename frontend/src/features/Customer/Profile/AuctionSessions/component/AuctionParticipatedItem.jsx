import React, { useState } from 'react';
import { CardMedia, CardContent, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { CalendarToday, HourglassEmpty, People, MonetizationOn, Gavel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { StyledCard, InfoChip } from '../style';

const AuctionParticipatedItem = ({ id, productName, imgSrc, auctionStartTime, auctionEndTime, participants, startingPrice, winningPrice, auctionHistory }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/session/${id}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledCard onClick={handleCardClick} sx={{ cursor: 'pointer' }}>
      <CardMedia
        component="img"
        sx={{ width: { xs: '100%', sm: 300 }, height: { xs: 200, sm: 'auto' } }}
        image={imgSrc || '/placeholder.svg?height=200&width=200'}
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

export default AuctionParticipatedItem;
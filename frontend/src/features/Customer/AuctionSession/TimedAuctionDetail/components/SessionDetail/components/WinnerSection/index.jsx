import React from 'react';
import {
  Divider,
  Fade,
  Box,
  Typography,
  Avatar,
  Chip,
  Grid,
} from '@mui/material';
import { Whatshot, AccessTime } from '@mui/icons-material';
import { primaryColor } from '../../style';

const WinnerSection = ({ item, isDeposit, isVendor, handleOpenHistoryDialog }) => {
  if (item.status !== 'AUCTION_SUCCESS' && item.status !== 'AUCTION_FAILED') return null;

  const placeholderImage = 'https://via.placeholder.com/150';

  return (
    <>
      <Divider sx={{ my: 3 }} />
      <Fade in={true} style={{ transitionDelay: '700ms' }}>
        <Box sx={{ p: 2, mt: 3 }}>
          <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            {item.status === 'AUCTION_FAILED' ? (
              <Typography variant="h6" color="error" align="center">
                Chưa có người đấu giá
              </Typography>
            ) : (
              <>
                <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                  Người Thắng Cuộc
                </Typography>
                <Avatar
                  src={item.auctionSessionInfo.user.avatar || placeholderImage}
                  alt="Winner Avatar"
                  sx={{ width: 100, height: 100, mb: 2, border: `4px solid ${primaryColor}` }}
                />
                <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                  {item.auctionSessionInfo.user.username}
                </Typography>
                <Typography variant="h6" align="center" sx={{ mb: 2 }} color="text.secondary">
                  Giá thắng:{' '}
                  <span style={{ fontWeight: 'bold', color: primaryColor }}>
                    {item.auctionSessionInfo.highestBid.toLocaleString('vi-VN')} VND
                  </span>
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Chip
                      icon={<Whatshot />}
                      label={`${item.auctionSessionInfo.totalBidder} người tham gia`}
                      color="primary"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item>
                    <Chip
                      icon={<AccessTime />}
                      label={`${item.auctionSessionInfo.totalAuctionHistory} lượt đấu giá`}
                      variant="outlined"
                      onClick={isDeposit || isVendor || item.status !== 'ONGOING' ? handleOpenHistoryDialog : undefined}
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
        </Box>
      </Fade>
    </>
  );
};

export default WinnerSection;
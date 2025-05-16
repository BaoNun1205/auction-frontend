import React from 'react'
import { ImHammer2 } from 'react-icons/im'
import { PiArrowRightFill } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Grid, Divider, Button } from '@mui/material'
import UpcomingAuctionItem from '../components/UpcomingAuctionItem/UpcomingAuctionItem'
import { useRecommendByUser } from '~/hooks/recommendHook'
import { useAppStore } from '~/store/appStore'
import { useFilterSessions } from '~/hooks/sessionHook'

function UpcomingAuctions() {
  const navigate = useNavigate()
  const { auth } = useAppStore()
  const userId = auth.user?.id

  const {
    data: recommendedData,
    isLoading: isLoadingRecommend,
    isError: isErrorRecommend
  } = useRecommendByUser(userId, 'UPCOMING');

  const {
    data: filteredData,
    isLoading: isLoadingFilter,
    isError: isErrorFilter
  } = useFilterSessions({ status: 'UPCOMING' });

  // Xử lý loading và error
  if (userId && isLoadingRecommend) {
    return <Typography>Loading...</Typography>;
  }
  if (!userId && isLoadingFilter) {
    return <Typography>Loading...</Typography>;
  }

  if (userId && isErrorRecommend) {
    return <Typography>Error loading sessions</Typography>;
  }
  if (!userId && isErrorFilter) {
    return <Typography>Error loading sessions</Typography>;
  }

  // Lấy dữ liệu hiển thị
  const items = userId ? recommendedData : filteredData?.data || [];

  return (
    <Box mx={5}>
      <Box textAlign="center">
        <Typography variant="h4" color="#B7201B" fontWeight="bold">Phiên đấu giá sắp diễn ra</Typography>
        <Box display="flex" justifyContent="center" alignItems="center" my={2}>
          <Divider sx={{ flexGrow: 1, bgcolor: 'gray' }} />
          <ImHammer2 size={32} className="text-mainBgColor" />
          <Divider sx={{ flexGrow: 1, bgcolor: 'gray' }} />
        </Box>
      </Box>
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <UpcomingAuctionItem item={item} />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" my={3}>
        <Button onClick={() => navigate('/search')} variant="contained" sx={{ bgcolor: '#b41712', '&:hover': { bgcolor: '#8B0000' } }} endIcon={<PiArrowRightFill />}>
          Xem thêm
        </Button>
      </Box>
    </Box>
  )
}

export default UpcomingAuctions
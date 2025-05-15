import React from 'react'
import { ImHammer2 } from 'react-icons/im'
import { PiArrowRightFill } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Grid, Divider, Button } from '@mui/material'
import UpcomingAuctionItem from '../components/UpcomingAuctionItem/UpcomingAuctionItem'
import { useRecommendByUser } from '~/hooks/recommendHook'
import { useAppStore } from '~/store/appStore'

function UpcomingAuctions() {
  const navigate = useNavigate()
  const { auth } = useAppStore()
  const userId = auth.user.id

  const { data: items, isLoading, isError } = useRecommendByUser(userId, 'UPCOMING')
  console.log('Data:', items)

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  if (isError) {
    return <Typography>Error loading sessions</Typography>
  }

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
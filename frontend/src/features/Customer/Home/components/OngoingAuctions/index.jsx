import React from 'react'
import { Box, Container, Typography, Grid, Button, Chip } from '@mui/material'
import { ArrowForward, AccessTime } from '@mui/icons-material'
import { useAppStore } from '~/store/appStore'
import { useRecommendByUser } from '~/hooks/recommendHook'
import { useFilterSessions } from '~/hooks/sessionHook'
import AuctionCard from '../OngoingAuctionCard'

const ongoingAuctions = [
  {
    id: 5,
    name: 'Bình gốm sứ thời Nguyễn',
    startingPrice: 35000000,
    currentPrice: 42000000,
    image: '/placeholder.svg?height=300&width=300',
    timeLeft: '1 giờ 15 phút',
    bids: 9,
    status: 'ending',
    percentComplete: 98
  },
  {
    id: 6,
    name: 'Xe Vespa cổ 1960',
    startingPrice: 75000000,
    currentPrice: 92000000,
    image: '/placeholder.svg?height=300&width=300',
    timeLeft: '2 giờ 30 phút',
    bids: 14,
    status: 'ending',
    percentComplete: 96
  },
  {
    id: 7,
    name: 'Bộ bàn ghế gỗ trắc thời Minh',
    startingPrice: 180000000,
    currentPrice: 195000000,
    image: '/placeholder.svg?height=300&width=300',
    timeLeft: '3 giờ 45 phút',
    bids: 7,
    status: 'ending',
    percentComplete: 92
  },
  {
    id: 8,
    name: 'Bộ sưu tập tiền xu cổ',
    startingPrice: 25000000,
    currentPrice: 32500000,
    image: '/placeholder.svg?height=300&width=300',
    timeLeft: '4 giờ 10 phút',
    bids: 11,
    status: 'ending',
    percentComplete: 90
  }
]

function OngoingAuctions() {
  const { auth } = useAppStore()
  const userId = auth.user?.id

  const {
    data: recommendedData,
    isLoading: isLoadingRecommend,
    isError: isErrorRecommend
  } = useRecommendByUser(userId, 'ONGOING')

  const {
    data: filteredData,
    isLoading: isLoadingFilter,
    isError: isErrorFilter
  } = useFilterSessions({ status: 'ONGOING' })

  // Xử lý loading và error
  if (userId && isLoadingRecommend) {
    return <Typography>Loading...</Typography>
  }
  if (!userId && isLoadingFilter) {
    return <Typography>Loading...</Typography>
  }

  if (userId && isErrorRecommend) {
    return <Typography>Error loading sessions</Typography>
  }
  if (!userId && isErrorFilter) {
    return <Typography>Error loading sessions</Typography>
  }

  // Lấy dữ liệu hiển thị
  const items = userId ? recommendedData : filteredData?.data || []

  return (
    <Box sx={{ py: 6, bgcolor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mr: 2 }}>
              Đang diễn ra
            </Typography>
            <Chip
              label="Còn ít thời gian"
              size="small"
              sx={{
                bgcolor: '#FF9800',
                color: 'white'
              }}
              icon={<AccessTime sx={{ fontSize: 16, color: 'white !important' }} />}
            />
          </Box>
          <Button endIcon={<ArrowForward />}>Xem tất cả</Button>
        </Box>
        <Grid container spacing={3}>
          {items.map((auction) => (
            <Grid item xs={12} sm={6} md={3} key={auction.id}>
              <AuctionCard auction={auction} type="ongoing" />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default OngoingAuctions
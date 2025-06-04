import React from 'react'
import { Box, Container, Typography, Grid, Button, Chip } from '@mui/material'
import { ArrowForward, HowToReg } from '@mui/icons-material'
import { useAppStore } from '~/store/appStore'
import { useRecommendByUser } from '~/hooks/recommendHook'
import { useFilterSessions } from '~/hooks/sessionHook'
import AuctionCard from '../UpcomingAuctionCard'

const primaryColor = '#B71C1C'

const upcomingAuctions = [
  {
    id: 9,
    name: 'Bộ sưu tập tranh Đông Hồ cổ',
    startingPrice: 25000000,
    bidIncrement: 1000000,
    image: '/placeholder.svg?height=300&width=300',
    startTime: '2 ngày nữa',
    registrations: 15,
    status: 'upcoming'
  },
  {
    id: 10,
    name: 'Xe Mercedes-Benz cổ 1980',
    startingPrice: 850000000,
    bidIncrement: 10000000,
    image: '/placeholder.svg?height=300&width=300',
    startTime: '1 tuần nữa',
    registrations: 8,
    status: 'upcoming'
  },
  {
    id: 11,
    name: 'Bộ chén Bát Tràng thời Lê',
    startingPrice: 45000000,
    bidIncrement: 2000000,
    image: '/placeholder.svg?height=300&width=300',
    startTime: '3 ngày nữa',
    registrations: 12,
    status: 'upcoming'
  },
  {
    id: 12,
    name: 'Đàn piano cổ Steinway',
    startingPrice: 180000000,
    bidIncrement: 5000000,
    image: '/placeholder.svg?height=300&width=300',
    startTime: '5 ngày nữa',
    registrations: 6,
    status: 'upcoming'
  }
]

function UpcomingAuctions() {
  const { auth } = useAppStore()
  const userId = auth.user?.id

  const {
    data: recommendedData,
    isLoading: isLoadingRecommend,
    isError: isErrorRecommend
  } = useRecommendByUser(userId, 'UPCOMING')

  const {
    data: filteredData,
    isLoading: isLoadingFilter,
    isError: isErrorFilter
  } = useFilterSessions({ status: 'UPCOMING' })

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
    <Box sx={{ py: 6, bgcolor: '#fef7f7' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mr: 2 }}>
              Sắp diễn ra
            </Typography>
            <Chip
              label="Đăng ký sớm"
              size="small"
              sx={{
                bgcolor: primaryColor,
                color: 'white'
              }}
              icon={<HowToReg sx={{ fontSize: 16, color: 'white !important' }} />}
            />
          </Box>
          <Button endIcon={<ArrowForward />}>Xem tất cả</Button>
        </Box>
        {items.length > 0 ? (
          <Grid container spacing={3}>
            {items.map((auction) => (
              <Grid item xs={12} sm={6} md={3} key={auction.auctionSessionId}>
                <AuctionCard auction={auction} type="upcoming" />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            Không có phiên đấu giá sắp diễn ra.
          </Typography>
        )}
      </Container>
    </Box>
  )
}

export default UpcomingAuctions
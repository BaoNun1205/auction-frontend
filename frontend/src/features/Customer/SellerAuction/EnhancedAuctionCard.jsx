import React from 'react'
import { Card, CardContent, CardMedia, Typography, Button, Box, Divider } from '@mui/material'
import { AccessTime, Gavel } from '@mui/icons-material'

const EnhancedAuctionCard = ({ session }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Kiểm tra nếu không có session
  if (!session) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography variant="h6" color="text.secondary">
          Không có phiên đấu giá nào
        </Typography>
      </Box>
    )
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        width: '100%', // Đảm bảo card chiếm toàn bộ chiều rộng trên màn hình nhỏ
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s ease-in-out', // Thêm hiệu ứng chuyển động mượt mà
        '&:hover': {
          transform: 'translateY(-8px)', // Di chuyển card lên trên 8px khi hover
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)' // Thêm đổ bóng để tăng hiệu ứng
        },
        '@media (max-width: 600px)': { // Breakpoint cho màn hình nhỏ hơn 600px
          maxWidth: '100%' // Card chiếm toàn bộ chiều rộng
        }
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={session.asset.mainImage}
        alt={session.name}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          '@media (max-width: 600px)': { // Breakpoint cho màn hình nhỏ hơn 600px
            padding: 2 // Điều chỉnh padding để phù hợp với màn hình nhỏ
          }
        }}
      >
        <Typography gutterBottom variant="h6" component="div">
          {session.name}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Giá khởi điểm:
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {formatCurrency(session.startingBids)}
          </Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Giá hiện tại:
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'success.main' }}>
            {formatCurrency(session?.auctionSessionInfo?.highestBid)}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTime sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Bắt đầu: {formatDate(session.startTime)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccessTime sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Kết thúc: {formatDate(session.endTime)}
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<Gavel />}
          disabled={session.status !== 'ONGOING'}
          sx={{
            bgcolor: '#b41712',
            '&:hover': {
              bgcolor: '#8B0000'
            },
            '&:disabled': {
              bgcolor: 'action.disabledBackground',
              color: 'action.disabled'
            }
          }}
        >
          Đấu giá ngay
        </Button>
      </Box>
    </Card>
  )
}

export default EnhancedAuctionCard
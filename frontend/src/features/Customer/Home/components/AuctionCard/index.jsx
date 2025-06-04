import React from 'react'
import { Box, Card, CardMedia, CardContent, Typography, Chip, LinearProgress, IconButton, Divider, Button } from '@mui/material'
import { Gavel, AccessTime, Visibility, Notifications, HowToReg, TrendingUp } from '@mui/icons-material'

const primaryColor = '#B71C1C'

function AuctionCard({ auction, type }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const getStatusColor = (status) => {
    switch (status) {
    case 'hot':
      return '#FF6B6B'
    case 'new':
      return '#4ECDC4'
    case 'ending':
      return '#FF9800'
    case 'upcoming':
      return primaryColor
    default:
      return '#757575'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
    case 'hot':
      return 'Đấu giá sôi nổi'
    case 'new':
      return 'Mới đăng'
    case 'ending':
      return 'Sắp kết thúc'
    case 'upcoming':
      return 'Sắp diễn ra'
    default:
      return 'Đang đấu giá'
    }
  }

  return (
    <Card
      sx={{
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 4
        },
        border: type === 'upcoming' ? '1px solid #8b0000' : type === 'ongoing' ? '1px solid #FF9800' : 'none'
      }}
    >
      {auction.status && (
        <Chip
          label={getStatusText(auction.status)}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            zIndex: 1,
            bgcolor: getStatusColor(auction.status),
            color: 'white',
            fontWeight: 'bold'
          }}
        />
      )}

      <Chip
        label={type === 'upcoming' ? `${auction.registrations} đăng ký` : `${auction.bids} lượt đấu`}
        size="small"
        icon={type === 'upcoming' ? <HowToReg sx={{ fontSize: 16, color: 'white !important' }} /> : <Gavel sx={{ fontSize: 16, color: 'white !important' }} />}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          bgcolor: '#2E3A59',
          color: 'white',
          '& .MuiChip-icon': {
            color: 'white'
          }
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          gap: 1,
          opacity: 0,
          transition: 'opacity 0.3s ease',
          '.MuiCard-root:hover &': {
            opacity: 1
          }
        }}
      >
        <IconButton
          sx={{
            bgcolor: 'white',
            boxShadow: 2,
            '&:hover': { bgcolor: '#f5f5f5' }
          }}
        >
          <Visibility />
        </IconButton>
        <IconButton
          sx={{
            bgcolor: 'white',
            boxShadow: 2,
            '&:hover': { bgcolor: '#f5f5f5' }
          }}
        >
          {type === 'ongoing' ? <TrendingUp /> : <Notifications />}
        </IconButton>
      </Box>

      <CardMedia component="img" height="200" image={auction.image} alt={auction.name} />
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            height: 48
          }}
        >
          {auction.name}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 1,
            color: type === 'upcoming' ? primaryColor : type === 'ongoing' ? '#FF9800' : '#757575'
          }}
        >
          <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
          <Typography variant="body2" sx={{ fontWeight: type === 'upcoming' || type === 'ongoing' ? 'bold' : 'normal', color: type === 'upcoming' ? primaryColor : type === 'ongoing' ? '#FF9800' : '#757575' }}>
            {type === 'upcoming' ? `Bắt đầu: ${auction.startTime}` : `Còn lại: ${auction.timeLeft}`}
          </Typography>
        </Box>

        {type !== 'upcoming' && (
          <LinearProgress
            variant="determinate"
            value={auction.percentComplete}
            sx={{
              mb: 2,
              height: 6,
              borderRadius: 3,
              bgcolor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                bgcolor: auction.percentComplete > 90 ? '#FF9800' : '#4ECDC4'
              }
            }}
          />
        )}

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Giá khởi điểm:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {formatPrice(auction.startingPrice)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {type === 'upcoming' ? 'Bước giá:' : 'Giá hiện tại:'}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: type === 'upcoming' ? primaryColor : '#FF6B6B' }}>
            {type === 'upcoming' ? formatPrice(auction.bidIncrement) : formatPrice(auction.currentPrice)}
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: type === 'upcoming' ? primaryColor : type === 'ongoing' ? '#FF9800' : '#2E3A59',
            '&:hover': { bgcolor: type === 'upcoming' ? '#8b0000' : type === 'ongoing' ? '#F57C00' : '#1a2332' }
          }}
          startIcon={type === 'upcoming' ? <HowToReg /> : <Gavel />}
        >
          {type === 'upcoming' ? 'Đăng ký' : type === 'ongoing' ? 'Đấu giá ngay' : 'Đặt giá'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default AuctionCard
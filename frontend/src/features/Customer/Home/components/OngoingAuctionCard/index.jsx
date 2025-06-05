import React from 'react'
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  IconButton,
  Divider,
  Button
} from '@mui/material'
import { Gavel, AccessTime, Visibility, Notifications, HowToReg, TrendingUp } from '@mui/icons-material'
import { useCustomNavigate } from '~/utils/navigate'

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
    case 'ONGOING':
      return '#FF9800'
    case 'UPCOMING':
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
    case 'ONGOING':
      return 'Đang diễn ra'
    case 'UPCOMING':
      return 'Sắp diễn ra'
    default:
      return 'Đang đấu giá'
    }
  }

  const calculateTimeLeft = (endTime, startTime) => {
    const now = new Date()
    const end = new Date(endTime)
    const start = new Date(startTime)
    const isUpcoming = start > now

    if (isUpcoming) {
      const diffMs = start - now
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

      if (days > 0) return `${days} ngày nữa`
      if (hours > 0) return `${hours} giờ nữa`
      return `${minutes} phút nữa`
    }

    const diffMs = end - now
    if (diffMs <= 0) return 'Đã kết thúc'

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days} ngày ${hours} giờ`
    if (hours > 0) return `${hours} giờ ${minutes} phút`
    return `${minutes} phút`
  }

  const calculatePercentComplete = (startTime, endTime) => {
    const now = new Date().getTime()
    const start = new Date(startTime).getTime()
    const end = new Date(endTime).getTime()
    if (end <= start || now >= end) return 100
    if (now <= start) return 0
    return Math.min(100, Math.round(((now - start) / (end - start)) * 100))
  }

  const { handleNavigate } = useCustomNavigate()

  const handleCardClick = () => {
    if (auction.status === 'ONGOING') {
      handleNavigate(`/session/${auction.auctionSessionId}`)
    } else if (auction.status === 'UPCOMING') {
      handleNavigate(`/session/register/${auction.auctionSessionId}`)
    }
  }

  const isUpcoming = type === 'upcoming' || new Date(auction.startTime) > new Date()
  const timeDisplay = isUpcoming
    ? calculateTimeLeft(auction.endTime, auction.startTime)
    : calculateTimeLeft(auction.endTime, auction.startTime)
  const percentComplete = isUpcoming ? 0 : calculatePercentComplete(auction.startTime, auction.endTime)

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
        border: isUpcoming ? '1px solid #8b0000' : type === 'ongoing' ? '1px solid #FF9800' : 'none',
        opacity: 1
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
        label={
          isUpcoming
            ? `${auction.auctionSessionInfo.totalRegistrations} đăng ký`
            : `${auction.auctionSessionInfo.totalAuctionHistory} lượt đấu`
        }
        size="small"
        icon={
          isUpcoming ? (
            <HowToReg sx={{ fontSize: 16, color: 'white !important' }} />
          ) : (
            <Gavel sx={{ fontSize: 16, color: 'white !important' }} />
          )
        }
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
          onClick={handleCardClick}
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
          {type === 'ongoing' && !isUpcoming ? <TrendingUp /> : <Notifications />}
        </IconButton>
      </Box>

      <CardMedia component="img" height="200" image={auction.asset.mainImage} alt={auction.name} />
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
            minHeight: 56,
            lineHeight: 1.4
          }}
        >
          {auction.name}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 1,
            color: isUpcoming ? primaryColor : type === 'ongoing' ? '#FF9800' : '#757575'
          }}
        >
          <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
          <Typography
            variant="body2"
            sx={{
              fontWeight: isUpcoming || type === 'ongoing' ? 'bold' : 'normal',
              color: isUpcoming ? primaryColor : type === 'ongoing' ? '#FF9800' : '#757575'
            }}
          >
            {isUpcoming ? `Bắt đầu: ${timeDisplay}` : `Kết thúc sau: ${timeDisplay}`}
          </Typography>
        </Box>

        {!isUpcoming && (
          <LinearProgress
            variant="determinate"
            value={percentComplete}
            sx={{
              mb: 2,
              height: 6,
              borderRadius: 3,
              bgcolor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                bgcolor: percentComplete > 90 ? '#FF9800' : '#4ECDC4'
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
            {formatPrice(auction.startingBids)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {isUpcoming ? 'Bước giá:' : 'Giá hiện tại:'}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: isUpcoming ? primaryColor : '#FF6B6B' }}>
            {isUpcoming ? formatPrice(auction.bidIncrement) : formatPrice(auction.auctionSessionInfo.highestBid)}
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          disabled={false}
          onClick={handleCardClick}
          sx={{
            bgcolor: isUpcoming ? primaryColor : type === 'ongoing' ? '#FF9800' : '#2E3A59',
            '&:hover': { bgcolor: isUpcoming ? '#8b0000' : type === 'ongoing' ? '#F57C00' : '#1a2332' },
            '&:disabled': { bgcolor: '#B0BEC5', color: 'white' }
          }}
          startIcon={isUpcoming ? <HowToReg /> : <Gavel />}
        >
          {isUpcoming ? 'Đăng ký' : type === 'ongoing' ? 'Đấu giá ngay' : 'Đặt giá'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default AuctionCard

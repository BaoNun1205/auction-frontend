import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Avatar
} from '@mui/material'
import { Message } from '@mui/icons-material'
import { Store } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCreateConversation } from '~/hooks/chatHook'
import { useAppStore } from '~/store/appStore'
import { useGetUserById } from '~/hooks/userHook'
import { formatRelativeTime, formatResponseTime } from '~/utils/customTime'
import { useFilterSessions } from '~/hooks/sessionHook'

const VendorInformation = ({ vendorId, isView = true }) => {
  const navigate = useNavigate()
  const { auth, setChatOpen, setChatVendorId } = useAppStore()
  const { mutate: createConversation, isLoading } = useCreateConversation()
  const { data: user, refetch: refetchUser } = useGetUserById(vendorId)
  const [imgError, setImgError] = useState(false)
  const { data, isError, refetch } = useFilterSessions({ userId: vendorId })

  useEffect(() => {
    if (isError) {
      console.error('Error fetching auction sessions')
    }
  }, [isError])

  useEffect(() => {
    console.log('Fetching auction sessions')
    refetch()
  }, [refetch])

  const auctionSessions = Array.isArray(data?.data) ? data.data : []

  const handleChatClick = () => {
    createConversation(
      { buyerId: auth.user.id, sellerId: vendorId },
      {
        onSuccess: () => {
          setChatVendorId(vendorId)
          setChatOpen(true)
        }
      }
    )
  }

  const sellerStats = [
    { label: 'Đánh Giá', value: '2,2tr' },
    { label: 'Tỉ Lệ Phản Hồi', value: user?.responseRate != null ? `${user.responseRate}%` : 'Chưa cập nhật' },
    { label: 'Phiên đấu giá', value: auctionSessions.length || 0 },
    { label: 'Thời Gian Phản Hồi', value: formatResponseTime(user?.responseTimeInSeconds) },
    { label: 'Tham Gia', value: formatRelativeTime(user?.createdAt) },
    { label: 'Người Theo Dõi', value: '3,9tr' }
  ]

  return (
    <Box
      sx={{
        p: 4,
        mb: 4,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
      }}
    >
      <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={4}>
        <Box display="flex" alignItems="flex-start" gap={3}>
          <Box position="relative">
            <Avatar
              alt={user?.username}
              src={!imgError ? user?.avatar : undefined}
              sx={{
                width: 100,
                height: 100,
                fontSize: '2.5rem',
                bgcolor: '#f5f5f5',
                color: '#757575',
                border: '1px solid',
                borderColor: 'divider'
              }}
              onError={() => setImgError(true)}
            >
              {(!user?.avatar || imgError) && user?.username?.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
          <Box flex={1}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 500,
                fontSize: '1.5rem',
                lineHeight: 1.2
              }}
            >
              {user?.name || user?.username || 'Người Bán'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              {formatRelativeTime(user?.lastSeen) === '0 phút trước' ? (
                <>
                  Đang Online
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'green' }} />
                </>
              ) : (
                `Online ${formatRelativeTime(user?.lastSeen)}`
              )}
            </Typography>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                startIcon={<Message />}
                onClick={handleChatClick}
                disabled={isLoading}
                sx={{
                  bgcolor: '#b41712',
                  color: 'white',
                  px: 3,
                  py: 1,
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: '#8B0000',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.12)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                CHAT
              </Button>
              {isView && (
                <Button
                  variant="outlined"
                  startIcon={<Store />}
                  onClick={() => navigate(`/store/${vendorId}`)}
                  sx={{
                    borderColor: 'rgba(0,0,0,0.12)',
                    color: 'text.primary',
                    px: 3,
                    py: 1,
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    '&:hover': {
                      borderColor: 'rgba(0,0,0,0.24)',
                      bgcolor: 'rgba(0,0,0,0.04)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.06)'
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  XEM
                </Button>
              )}
            </Box>
          </Box>
        </Box>

        {/* Thống kê */}
        <Box
          display="flex"
          flexWrap="wrap"
          gap={3}
          sx={{
            '& > div': {
              borderLeft: '1px solid',
              borderColor: 'divider',
              '&:nth-of-type(3n+1)': {
                borderLeft: 'none'
              },
              '@media (max-width: 600px)': {
                '&:nth-of-type(2n+1)': {
                  borderLeft: 'none'
                }
              }
            }
          }}
        >
          {sellerStats.map((stat, index) => (
            <Box
              key={index}
              sx={{
                flex: '1 1 calc(33.333% - 16px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: 2
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {stat.label}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: stat.isHighlighted ? '#ee4d2d' : 'text.primary',
                  fontWeight: 500,
                  fontSize: '1rem'
                }}
              >
                {stat.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default VendorInformation

import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, Avatar } from '@mui/material'
import { Add, Message } from '@mui/icons-material'
import { Store } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCreateConversation } from '~/hooks/chatHook'
import { useAppStore } from '~/store/appStore'
import { useGetUserById } from '~/hooks/userHook'
import { formatRelativeTime, formatResponseTime } from '~/utils/customTime'
import { useFilterSessions } from '~/hooks/sessionHook'
import { useFollowUser, useUnfollowUser, useIsFollowing, useCountFollowers } from '~/hooks/followHook'
import ReviewFormDialog from './components/ReviewForm'
import { useCountReviewsByUser } from '~/hooks/reviewHook'
import Authentication from '~/features/Authentication'
import AppModal from '~/components/Modal/Modal'

const VendorInformation = ({ vendorId, isView = true }) => {
  const navigate = useNavigate()
  const { auth, setChatOpen, setChatVendorId } = useAppStore()
  const { mutate: createConversation, isLoading } = useCreateConversation()
  const { data: user, refetch: refetchUser } = useGetUserById(vendorId)
  const [imgError, setImgError] = useState(false)
  const { data, isError, refetch } = useFilterSessions({ userId: vendorId })
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [authModalRef, setAuthModalRef] = useState(null)

  const currentUserId = auth.user?.id
  const isCurrentUserVendor = currentUserId === vendorId

  const { data: isFollowing, refetch: refetchIsFollowing } = useIsFollowing(currentUserId, vendorId)
  const { data: followerCount, refetch: refetchFollowerCount } = useCountFollowers(vendorId)
  const { data: reviewCount } = useCountReviewsByUser(vendorId)

  const { mutate: followVendor } = useFollowUser()
  const { mutate: unfollowVendor } = useUnfollowUser()

  const handleFollowClick = () => {
    if (!auth.isAuth || !auth.user?.id) {
      authModalRef?.click()
      return
    }

    if (isFollowing) {
      unfollowVendor(
        { followerId: currentUserId, followeeId: vendorId },
        {
          onSuccess: () => {
            refetchIsFollowing()
            refetchFollowerCount()
          }
        }
      )
    } else {
      followVendor(
        { followerId: currentUserId, followeeId: vendorId },
        {
          onSuccess: () => {
            refetchIsFollowing()
            refetchFollowerCount()
          }
        }
      )
    }
  }

  const handleOpenReviewDialog = () => {
    if (!auth.isAuth || !auth.user?.id) {
      authModalRef?.click()
      return
    }

    setShowReviewDialog(true)
  }

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
    if (!auth.isAuth || !auth.user?.id) {
      authModalRef?.click()
      return
    }

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
    {
      key: 'review',
      label: 'Đánh Giá',
      value: `${reviewCount ?? 0}`,
      rating: user?.averageReviewRating ?? 0,
      isHighlighted: false
    },
    {
      key: 'responseRate',
      label: 'Tỉ Lệ Phản Hồi',
      value: user?.responseRate != null ? `${user.responseRate}%` : 'Chưa cập nhật',
      isHighlighted: false
    },
    {
      key: 'auctionSessions',
      label: 'Phiên đấu giá',
      value: auctionSessions.length || 0,
      isHighlighted: false
    },
    {
      key: 'responseTime',
      label: 'Thời Gian Phản Hồi',
      value: formatResponseTime(user?.responseTimeInSeconds),
      isHighlighted: false
    },
    {
      key: 'joined',
      label: 'Tham Gia',
      value: formatRelativeTime(user?.createdAt),
      isHighlighted: false
    },
    {
      key: 'followers',
      label: 'Người Theo Dõi',
      value: followerCount,
      isHighlighted: false
    }
  ]

  return (
    <>
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
          {/* Profile Section */}
          <Box
            display="flex"
            alignItems="flex-start"
            gap={3}
            sx={{
              minWidth: { xs: 'auto', lg: isCurrentUserVendor ? 300 : 420 },
              width: { xs: '100%', lg: 'auto' }
            }}
          >
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
                  lineHeight: 1.2,
                  mb: 1
                }}
              >
                {user?.name || user?.username || 'Người Bán'}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                {formatRelativeTime(user?.lastSeen) === '0 phút trước' ? (
                  <>
                    Đang Online
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'green' }} />
                  </>
                ) : (
                  `Online ${formatRelativeTime(user?.lastSeen)}`
                )}
              </Typography>

              {/* Action Buttons */}
              <Box
                display="flex"
                gap={2}
                sx={{
                  flexWrap: { xs: 'wrap', sm: 'nowrap' },
                  '& .MuiButton-root': {
                    whiteSpace: 'nowrap',
                    minWidth: 'auto',
                    flexShrink: 0
                  }
                }}
              >
                {/* Chat Button - Only show if not current user */}
                {!isCurrentUserVendor && (
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
                      textTransform: 'none',
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
                )}

                {/* Follow/Unfollow Button - Only show if not current user and not in view mode */}
                {!isCurrentUserVendor && !isView && (
                  <Button
                    variant={isFollowing ? 'outlined' : 'contained'}
                    startIcon={!isFollowing && <Add />}
                    onClick={handleFollowClick}
                    sx={{
                      borderColor: 'rgba(0,0,0,0.12)',
                      color: isFollowing ? 'text.primary' : 'white',
                      backgroundColor: isFollowing ? 'transparent' : '#b41712',
                      px: 3,
                      py: 1,
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: 'rgba(0,0,0,0.24)',
                        bgcolor: isFollowing ? 'rgba(0,0,0,0.04)' : '#8B0000',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.06)'
                      },
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    {isFollowing ? 'BỎ THEO DÕI' : 'THEO DÕI'}
                  </Button>
                )}

                {/* View Store Button - Only show in view mode */}
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
                      textTransform: 'none',
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

          {/* Statistics Section */}
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              lg: 'repeat(3, 1fr)'
            }}
            gap={3}
            sx={{
              flex: 1,
              '& > div': {
                borderLeft: '1px solid',
                borderColor: 'divider'
              }
            }}
          >
            {sellerStats.map((stat, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: { xs: 1, sm: 2 },
                  minHeight: 80
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 0.5,
                    fontSize: '0.875rem',
                    lineHeight: 1.2
                  }}
                >
                  {stat.label}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: stat.isHighlighted ? '#ee4d2d' : 'text.primary',
                    fontWeight: 500,
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    lineHeight: 1.3,
                    mb: stat.key === 'review' ? 0.5 : 0
                  }}
                >
                  {stat.key === 'review' ? `${stat.value} (${stat.rating.toFixed(1)} ★)` : stat.value}
                </Typography>

                {stat.key === 'review' && !isCurrentUserVendor && (
                  <Typography
                    variant="body2"
                    sx={{
                      cursor: 'pointer',
                      color: '#b41712',
                      fontSize: '1rem',
                      '&:hover': {
                        textDecoration: 'underline'
                      },
                      p: 0,
                      m: 0
                    }}
                    onClick={handleOpenReviewDialog}
                  >
                    + Thêm đánh giá
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <ReviewFormDialog open={showReviewDialog} onClose={() => setShowReviewDialog(false)} vendorId={vendorId} />

      {/* Authentication Modal */}
      <AppModal
        trigger={
          <div ref={(ref) => setAuthModalRef(ref)} style={{ display: 'none' }}>
            Hidden Trigger
          </div>
        }
        maxWidth="500px"
      >
        <Box sx={{ pt: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#b41712', mb: 3 }}>
            Đăng nhập để tiếp tục
          </Typography>
          <Authentication />
        </Box>
      </AppModal>
    </>
  )
}

export default VendorInformation

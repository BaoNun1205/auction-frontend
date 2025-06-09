import React from 'react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { Box, Container, Typography, Button, Chip, IconButton } from '@mui/material'
import { ArrowForward, AccessTime, ChevronLeft, ChevronRight } from '@mui/icons-material'
import { useAppStore } from '~/store/appStore'
import { useRecommendByUser } from '~/hooks/recommendHook'
import { useFilterSessions } from '~/hooks/sessionHook'
import AuctionCard from '../OngoingAuctionCard'
import { useNavigate } from 'react-router-dom'
import UpcomingAuctionsSkeleton from '../Skeletons/UpcomingAuctionsSkeleton'

function OngoingAuctions() {
  const { auth } = useAppStore()
  const userId = auth.user?.id
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const navigate = useNavigate()

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
  const isLoading = isLoadingRecommend || isLoadingFilter
  const isError = isErrorRecommend || isErrorFilter

  // Memoize items to ensure stability
  const items = useMemo(() => {
    return userId ? recommendedData || [] : filteredData?.data || []
  }, [userId, recommendedData, filteredData])

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320 // Approximate width of one card including margin
      scrollContainerRef.current.scrollBy({
        left: -cardWidth * 2, // Scroll 2 cards at a time
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320 // Approximate width of one card including margin
      scrollContainerRef.current.scrollBy({
        left: cardWidth * 2, // Scroll 2 cards at a time
        behavior: 'smooth'
      })
    }
  }

  const handleViewAll = () => {
    navigate('/search?status=ONGOING')
  }

  useEffect(() => {
    checkScrollButtons()
    const handleResize = () => checkScrollButtons()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [items])

  // Show skeleton while loading
  if (isLoading) {
    return <UpcomingAuctionsSkeleton />
  }

  // Show error state
  if (isError) {
    return (
      <Box sx={{ py: 6, bgcolor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
            Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.
          </Typography>
        </Container>
      </Box>
    )
  }

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
          <Button onClick={handleViewAll} endIcon={<ArrowForward />}>
            Xem tất cả
          </Button>
        </Box>

        {items.length > 0 ? (
          <Box sx={{ position: 'relative' }}>
            {/* Left Navigation Button */}
            {canScrollLeft && (
              <IconButton
                onClick={scrollLeft}
                sx={{
                  position: 'absolute',
                  left: -20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  bgcolor: 'white',
                  boxShadow: 2,
                  width: 48,
                  height: 48,
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                    boxShadow: 3
                  }
                }}
              >
                <ChevronLeft sx={{ fontSize: 28 }} />
              </IconButton>
            )}

            {/* Right Navigation Button */}
            {canScrollRight && (
              <IconButton
                onClick={scrollRight}
                sx={{
                  position: 'absolute',
                  right: -20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  bgcolor: 'white',
                  boxShadow: 2,
                  width: 48,
                  height: 48,
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                    boxShadow: 3
                  }
                }}
              >
                <ChevronRight sx={{ fontSize: 28 }} />
              </IconButton>
            )}

            {/* Scrollable Cards Container */}
            <Box
              ref={scrollContainerRef}
              onScroll={checkScrollButtons}
              sx={{
                display: 'flex',
                gap: 3,
                overflowX: 'auto',
                overflowY: 'hidden',
                scrollBehavior: 'smooth',
                pb: 2,
                '&::-webkit-scrollbar': {
                  display: 'none'
                },
                '-ms-overflow-style': 'none',
                'scrollbar-width': 'none',
                mx: 2
              }}
            >
              {items.map((auction) => (
                <Box
                  key={auction.id}
                  sx={{
                    minWidth: 300,
                    maxWidth: 300,
                    flexShrink: 0
                  }}
                >
                  <AuctionCard auction={auction} type="ongoing" />
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            Không có phiên đấu giá đang diễn ra.
          </Typography>
        )}

        {/* Mobile Touch Scroll Indicator */}
        {items.length > 0 && (
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'center',
              mt: 2,
              gap: 1
            }}
          >
            <Typography variant="caption" color="text.secondary">
              ← Vuốt để xem thêm →
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default OngoingAuctions

import React, { useRef, useState, useEffect } from 'react'
import { Box, Container, Typography, Button, Chip, IconButton } from '@mui/material'
import { ArrowForward, AccessTime, ChevronLeft, ChevronRight } from '@mui/icons-material'
import { useAppStore } from '~/store/appStore'
import { useRecommendByUser } from '~/hooks/recommendHook'
import { useFilterSessions } from '~/hooks/sessionHook'
import AuctionCard from '../OngoingAuctionCard'
import { useNavigate } from 'react-router-dom'

function FeaturedAuctions() {
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
  } = useRecommendByUser(userId, 'HOT')

  const {
    data: filteredData,
    isLoading: isLoadingFilter,
    isError: isErrorFilter
  } = useFilterSessions({ status: 'HOT' })

  // Xử lý loading và error
  const isLoading = userId ? isLoadingRecommend : isLoadingFilter
  const isError = userId ? isErrorRecommend : isErrorFilter
  const items = userId ? recommendedData : filteredData?.data || []

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

  return (
    <Box sx={{ py: 6, bgcolor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : isError ? (
          <Typography>Error loading sessions</Typography>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  Phiên đấu giá nổi bật
                </Typography>
              </Box>
              <Button onClick={handleViewAll} endIcon={<ArrowForward />}>
                Xem tất cả
              </Button>
            </Box>

            {/* Scroll Container with Navigation */}
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
                  // Hide scrollbar
                  '&::-webkit-scrollbar': {
                    display: 'none'
                  },
                  '-ms-overflow-style': 'none',
                  'scrollbar-width': 'none',
                  // Add padding for navigation buttons
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

            {/* Mobile Touch Scroll Indicator */}
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
          </>
        )}
      </Container>
    </Box>
  )
}

export default FeaturedAuctions
import React, { useEffect, useState } from 'react'
import { Box, Typography, IconButton, useTheme, useMediaQuery, CardContent, Grid, CardActionArea } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { StyledCard, StyledCardMedia, StyledChip } from './style'
import { useGetRelatedSessions } from '~/hooks/sessionHook'

const getStatusColor = (status) => {
  switch (status) {
  case 'UPCOMING':
    return 'info'
  case 'ONGOING':
    return 'warning'
  case 'AUCTION_SUCCESS':
    return 'success'
  case 'AUCTION_FAILED':
    return 'error'
  default:
    return 'default'
  }
}

const getStatusLabel = (status) => {
  switch (status) {
  case 'UPCOMING':
    return 'Sắp diễn ra'
  case 'ONGOING':
    return 'Đang diễn ra'
  case 'AUCTION_SUCCESS':
    return 'Đấu giá thành công'
  case 'AUCTION_FAILED':
    return 'Đấu giá thất bại'
  default:
    return status
  }
}

const RelatedPaintings = ({ id }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { data, refetch, isError } = useGetRelatedSessions(id)

  useEffect(() => {
    if (isError) {
      console.error('Error fetching auction sessions')
    }
  }, [isError])

  useEffect(() => {
    console.log('Fetching auction sessions')
    refetch()
  }, [refetch])

  const relatedSessions = Array.isArray(data?.data) ? data?.data : []
  console.log('Related sessions:', relatedSessions)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.max(relatedSessions.length - 2, 1))
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.max(relatedSessions.length - 2, 1)) % Math.max(relatedSessions.length - 2, 1))
  }

  if (!relatedSessions || relatedSessions.length === 0) {
    return null
  }

  return (
    <Box my={6}>
      <Typography variant="h5" gutterBottom fontWeight="bold" mb={3}>
        Có thể bạn quan tâm
      </Typography>
      <Box position="relative">
        <Grid container spacing={3}>
          {relatedSessions.slice(currentIndex, currentIndex + 3).map((session, index) => (
            <Grid item xs={12} sm={6} md={4} key={session.auctionSessionId}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <StyledCard>
                  <CardActionArea>
                    <Box position="relative">
                      <StyledCardMedia
                        image={session.asset.mainImage || 'https://via.placeholder.com/400x300'}
                        title={session.asset.assetName}
                      />
                      <StyledChip
                        label={getStatusLabel(session.status)}
                        color={getStatusColor(session.status)}
                        size="small"
                      />
                    </Box>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div" noWrap>
                        {session.asset.assetName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom noWrap>
                        {session.name}
                      </Typography>
                      <Box mt={2}>
                        <Typography variant="body2" fontWeight="bold">
                          Giá khởi điểm: {session.startingBids.toLocaleString('vi-VN')} ₫
                        </Typography>
                        {session.auctionSessionInfo && (
                          <Typography variant="body2" color="primary" mt={1} fontWeight="bold">
                            Giá cao nhất: {session.auctionSessionInfo.highestBid.toLocaleString('vi-VN')} ₫
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </StyledCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        {!isMobile && relatedSessions.length > 3 && (
          <>
            <IconButton
              onClick={handlePrev}
              sx={{
                position: 'absolute',
                left: -20,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'background.default' }
              }}
            >
              <ArrowBackIos />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: -20,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'background.default' }
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  )
}

export default RelatedPaintings


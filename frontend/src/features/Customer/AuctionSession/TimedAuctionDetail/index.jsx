import React from 'react'
import { Box, Container } from '@mui/material'
import RelatedPaintings from './components/RelatedPaintings/RelatedPaintings'
import { useGetSessionById } from '~/hooks/sessionHook'
import { useParams } from 'react-router-dom'
import SessionDetail from './components/SessionDetail'
import { SessionDetailSkeleton } from './components/Skeletons/SessionDetailSkeleton'
import { RelatedPaintingsSkeleton } from './components/Skeletons/RelatedPaintingsSkeleton'

const TimedAuctionDetail = () => {
  const { id } = useParams()
  const { data, refetch, isLoading, isError } = useGetSessionById(id)
  console.log('Session: ', data)

  if (isLoading) {
    return (
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <Box py={4}>
            <SessionDetailSkeleton />
            <RelatedPaintingsSkeleton />
          </Box>
        </Container>
      </Box>
    )
  }

  if (isError) {
    return (
      <Box
        sx={{
          bgcolor: 'background.default',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" py={8}>
            <Box
              component="img"
              src="/placeholder.svg?height=200&width=200"
              alt="Error"
              sx={{ width: 200, height: 200, opacity: 0.6, mb: 4 }}
            />
            <Box sx={{ typography: 'h5', mb: 2, color: 'text.secondary' }}>Không thể tải thông tin phiên đấu giá</Box>
            <Box sx={{ typography: 'body1', color: 'text.secondary', mb: 4 }}>
              Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.
            </Box>
          </Box>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Box py={4}>
          <SessionDetail item={data} refresh={refetch} />
          <RelatedPaintings id={id} />
          {/* <RelatedSearches /> */}
        </Box>
      </Container>
    </Box>
  )
}

export default TimedAuctionDetail

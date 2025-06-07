import React from 'react'
import { ImHammer2 } from 'react-icons/im'
import { Box, Typography, Divider } from '@mui/material'
import CurrentAuctionItem from '../components/CurrentAuctionItem/CurrentAuctionItem'
import { useRecommendByUser } from '~/hooks/recommendHook'
import { useAppStore } from '~/store/appStore'
import { useFilterSessions } from '~/hooks/sessionHook'

const CurrentAuctions = () => {
  const { auth } = useAppStore()
  const userId = auth.user?.id

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
    <Box textAlign="center" my={4} mx={5}>
      <Typography variant="h4" color="#B7201B" fontWeight="bold">Phiên đấu giá đang diễn ra</Typography>
      <Box display="flex" justifyContent="center" alignItems="center" my={2}>
        <Divider sx={{ flexGrow: 1, bgcolor: 'gray' }} />
        <ImHammer2 size={32} className="text-mainBgColor" />
        <Divider sx={{ flexGrow: 1, bgcolor: 'gray' }} />
      </Box>
      <CurrentAuctionItem items={items} />
    </Box>
  )
}

export default CurrentAuctions
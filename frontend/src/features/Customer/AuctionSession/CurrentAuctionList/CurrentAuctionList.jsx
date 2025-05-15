import React from 'react'
import { ImHammer2 } from 'react-icons/im'
import { Box, Typography, Divider } from '@mui/material'
import CurrentAuctionItem from '../components/CurrentAuctionItem/CurrentAuctionItem'
import { useRecommendByUser } from '~/hooks/recommendHook'
import { useAppStore } from '~/store/appStore'

const CurrentAuctions = () => {
  const { auth } = useAppStore()
  const userId = auth.user.id

  const { data: items, isLoading, isError } = useRecommendByUser(userId, 'ONGOING')
  console.log('Data:', items)

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  if (isError) {
    return <Typography>Error loading sessions</Typography>
  }
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
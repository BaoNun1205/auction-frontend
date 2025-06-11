import React, { useState } from 'react'
import {
  Box,
  Typography,
  Tabs,
  Container
} from '@mui/material'
import { useAppStore } from '~/store/appStore'
import { StyledTab } from './style'
import { useGetRegistedSessionByUserId } from '~/hooks/sessionHook'
import { useGetJoinedSessions } from '~/hooks/depositHook'
import { AuctionRegisteredItem } from './component/AuctionRegisteredItem'
import { AuctionParticipatedItem } from './component/AuctionParticipatedItem'
import AuctionSessionsSkeleton from './component/AuctionItemSkeleton'

const AuctionSessions = () => {
  const [tab, setTab] = useState(0)
  const { auth } = useAppStore()
  const {
    data: registedSessions,
    isLoading: isLoadingRegistered,
    isError: isErrorRegistered
  } = useGetRegistedSessionByUserId(auth.user.id)
  const {
    data: joinedSessions,
    isLoading: isLoadingJoined,
    isError: isErrorJoined
  } = useGetJoinedSessions(auth.user.id)

  const handleChange = (event, newValue) => {
    setTab(newValue)
  }

  // Show skeleton while loading
  if (isLoadingRegistered || isLoadingJoined) {
    return <AuctionSessionsSkeleton />
  }

  if (isErrorRegistered || isErrorJoined) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error">
            Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.
          </Typography>
        </Box>
      </Container>
    )
  }

  const upcomingSessions = registedSessions.filter(session => session.auctionSession.status === 'UPCOMING')

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Phiên đấu giá
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Lưu trữ các phiên đấu giá đã đăng ký và tham gia
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            centered
            TabIndicatorProps={{
              style: {
                backgroundColor: '#B7201B'
              }
            }}
          >
            <StyledTab label="Đã đăng ký" />
            <StyledTab label="Đã tham gia" />
          </Tabs>
        </Box>

        <Box sx={{ minHeight: '400px', maxHeight: '600px', overflowY: 'auto' }}>
          {tab === 0 ? (
            <Box>
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((item) => (
                  <AuctionRegisteredItem
                    id={item.auctionSession.auctionSessionId}
                    key={item.auctionSession.auctionSessionId}
                    auctionName={item.auctionSession.name}
                    imgSrc={item.auctionSession.asset?.listImages?.[0]?.imageAsset || '/placeholder.svg?height=200&width=200'}
                    startTime={item.auctionSession.startTime}
                    endTime={item.auctionSession.endTime}
                    startingPrice={item.auctionSession.startingBids}
                    registrants={item.totalRegistrations}
                  />
                ))
              ) : (
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                  Chưa có phiên đấu giá sắp diễn ra nào được đăng ký.
                </Typography>
              )}
            </Box>
          ) : (
            <Box>
              {joinedSessions.length > 0 ? (
                joinedSessions.map((item) => (
                  <AuctionParticipatedItem
                    id={item.sessionId}
                    key={item.sessionId}
                    productName={item.auctionSession.asset.assetName}
                    imgSrc={item.auctionSession.asset.mainImage || '/placeholder.svg?height=200&width=200'}
                    auctionStartTime={item.auctionSession.startTime}
                    auctionEndTime={item.auctionSession.endTime}
                    participants={item.auctionSession.auctionSessionInfo.totalBidder}
                    startingPrice={item.auctionSession.startingBids}
                    winningPrice={item.auctionSession.auctionSessionInfo.highestBid}
                  />
                ))
              ) : (
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                  Chưa có phiên đấu giá nào đã tham gia.
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  )
}

export default AuctionSessions
import React, { useState, useMemo } from 'react'
import {
  Box, Typography, Tabs, CardMedia, CardContent,
  CardActions, Button, Modal, Grid, Paper,
  Container, useTheme, useMediaQuery,
  Avatar,
  Divider
} from '@mui/material'
import {
  LocalShipping, Inventory, CheckCircle,
  ListAlt, Timer, Gavel, Close,
  Cancel,
  Person,
  Home,
  Phone
} from '@mui/icons-material'
import { useGetWinSessionsByUserId } from '~/hooks/sessionHook'
import { useAppStore } from '~/store/appStore'
import { StyledTab, StyledCard, InfoChip, AnimatedButton } from './style'
import { useNavigate } from 'react-router-dom'

const WonItems = () => {
  const [tab, setTab] = useState(0)
  const navigate = useNavigate()
  const { auth } = useAppStore()
  const { data } = useGetWinSessionsByUserId(auth.user.id)
  const wonItems = Array.isArray(data) ? data : []

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  }

  const handleOpenDetails = (item) => {
    navigate(`/checkout/${item.auctionSession.auctionSessionId}`)
  }

  const getStatusChip = (status) => {
    const statusConfig = {
      PREPARING: { icon: <Inventory />, label: 'Đang chuẩn bị', color: 'warning' },
      DELIVERING: { icon: <LocalShipping />, label: 'Đang giao hàng', color: 'info' },
      RECEIVED: { icon: <CheckCircle />, label: 'Đã nhận hàng', color: 'success' },
      CANCELED: { icon: <Cancel />, label: 'Đã hủy', color: 'error' }
    }
    const config = statusConfig[status] || statusConfig.CANCELED

    return (
      <InfoChip
        icon={config.icon}
        label={config.label}
        color={config.color}
        size="small"
      />
    )
  }

  const filteredData = useMemo(() => {
    if (tab === 0) return wonItems
    const statusKeys = ['PREPARING', 'DELIVERING', 'RECEIVED', 'CANCELED']
    return wonItems.filter(item => item.status === statusKeys[tab - 1])
  }, [tab, wonItems])

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '100%', py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#b41712' }}>
          Chiến lợi phẩm
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Lưu trữ các vật phẩm đã thắng trong các phiên đấu giá
        </Typography>

        <Paper elevation={0} sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            textColor="inherit"
            TabIndicatorProps={{ sx: { bgcolor: '#b41712' } }}
          >
            <StyledTab icon={<ListAlt />} label="Tất cả" />
            <StyledTab icon={<Inventory />} label="Đang chuẩn bị" />
            <StyledTab icon={<LocalShipping />} label="Đang giao" />
            <StyledTab icon={<CheckCircle />} label="Đã nhận" />
            <StyledTab icon={<Cancel />} label="Đã hủy" />
          </Tabs>
        </Paper>

        <Box sx={{ mt: 3 }}>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <StyledCard key={item.sessionWinnerId}>
                <Box sx={{ position: 'relative', width: 208, height: 208, m: 1 }}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 2,
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }}
                    image={item.auctionSession.asset.mainImage || '/placeholder.svg?height=200&width=200'}
                    alt={item.auctionSession.asset.assetName}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2 }}>
                  <CardContent sx={{ flex: '1 0 auto', p: 0 }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {item.auctionSession.asset.assetName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      Giá thắng: {item.price.toLocaleString('vi-VN')} VNĐ
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Timer color="action" fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        Thời gian đấu giá: {new Date(item.victoryTime).toLocaleString('vi-VN')}
                      </Typography>
                    </Box>
                    {getStatusChip(item.status)}
                  </CardContent>
                  <CardActions sx={{ mt: 'auto', justifyContent: 'flex-end', p: 0 }}>
                    <AnimatedButton
                      variant="contained"
                      onClick={() => handleOpenDetails(item)}
                      sx={{ mt: 2 }}
                    >
                      Xem chi tiết
                    </AnimatedButton>
                  </CardActions>
                </Box>
              </StyledCard>
            ))
          ) : (
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
              sx={{ py: 4 }}
            >
              Không có vật phẩm nào
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  )
}

export default WonItems
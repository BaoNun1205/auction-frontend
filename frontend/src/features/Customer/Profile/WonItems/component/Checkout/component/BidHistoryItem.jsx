import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent
} from '@mui/material'
import {
  CalendarToday,
  Gavel
} from '@mui/icons-material'

export const BidHistoryItem = ({ bid, isWinner }) => {
  return (
    <Card
      elevation={0}
      sx={{
        mb: 2,
        borderRadius: 2,
        bgcolor: isWinner ? 'rgba(25, 118, 210, 0.05)' : '#f5f5f5',
        border: isWinner ? '1px solid rgba(25, 118, 210, 0.2)' : 'none',
        overflow: 'visible'
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                bgcolor: isWinner ? 'primary.main' : 'grey.400',
                boxShadow: isWinner ? '0 2px 8px rgba(25, 118, 210, 0.3)' : 'none',
                mr: 2
              }}
            >
              {bid.user.name?.charAt(0) || bid.user.username[0]}
            </Avatar>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {bid.user.name || bid.user.username}
                </Typography>
                {isWinner && (
                  <Typography
                    variant="caption"
                    sx={{
                      ml: 1,
                      bgcolor: 'primary.main',
                      color: 'white',
                      px: 1,
                      py: 0.3,
                      borderRadius: 5
                    }}
                  >
                    Thắng cuộc
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <CalendarToday fontSize="small" sx={{ color: 'text.secondary', fontSize: 14, mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {new Date(bid.bidTime).toLocaleString('vi-VN')}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Gavel sx={{ color: isWinner ? 'primary.main' : 'text.secondary', mr: 1 }} />
              <Typography
                variant="h6"
                color={isWinner ? 'primary.main' : 'text.primary'}
                fontWeight={isWinner ? 'bold' : 'medium'}
              >
                {bid.bidPrice.toLocaleString('vi-VN')} VNĐ
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
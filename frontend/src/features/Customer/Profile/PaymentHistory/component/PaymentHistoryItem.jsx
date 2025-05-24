import React from 'react'
import { Box, Typography, Card, CardContent, Grid, IconButton, Tooltip } from '@mui/material'
import { Receipt, Visibility, CalendarToday, AccountBalance } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const PaymentHistoryItem = ({ payment }) => {
  const navigate = useNavigate()

  const handleViewInvoice = () => {
    navigate(`/invoice/${payment.id}`)
  }

  return (
    <Card elevation={0} sx={{ borderRadius: 2, mb: 2, border: '1px solid #eee' }}>
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component="img"
                src={
                  payment.asset?.mainImage ||
                  (payment.asset?.listImages && payment.asset.listImages[0]?.imageAsset) ||
                  '/placeholder.svg?height=60&width=60'
                }
                alt={payment.asset?.assetName}
                sx={{ width: 60, height: 60, borderRadius: 1, mr: 2, objectFit: 'cover' }}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight="medium" noWrap sx={{ maxWidth: 200 }}>
                  {payment.asset?.assetName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <CalendarToday fontSize="small" sx={{ color: 'text.secondary', fontSize: 14, mr: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(payment.paymentDate).toLocaleDateString('vi-VN')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Mã hóa đơn
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              INV-{payment.id.substring(0, 8).toUpperCase()}
            </Typography>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Phương thức
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccountBalance fontSize="small" sx={{ color: 'text.secondary', fontSize: 14, mr: 0.5 }} />
              <Typography variant="body2">Chuyển khoản</Typography>
            </Box>
          </Grid>

          <Grid item xs={6} sm={6} md={2}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Số tiền
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
              {payment.amount.toLocaleString('vi-VN')} VNĐ
            </Typography>
          </Grid>

          <Grid item xs={6} sm={6} md={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box>
              <Tooltip title="Xem hóa đơn">
                <IconButton color="primary" onClick={handleViewInvoice} sx={{ mr: 1 }}>
                  <Receipt />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PaymentHistoryItem

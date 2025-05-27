import React, { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material'
import { Search, Receipt, ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './style'
import PaymentHistoryItem from './component/PaymentHistoryItem'
import { useAppStore } from '~/store/appStore'
import { useBillsByUserId } from '~/hooks/billHooks'

const PaymentHistory = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')
  const [timeFilter, setTimeFilter] = useState('all')
  const { auth } = useAppStore()
  const { data } = useBillsByUserId(auth.user.id)

  // Xử lý dữ liệu API, đảm bảo là mảng
  const wonItems = Array.isArray(data) ? data : [];
  console.log('wonItems: ', wonItems)

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value)
  }

  // Filter and sort payments
  const filteredPayments = useMemo(() => {
    return wonItems
      .filter((item) => {
        // Filter by search term
        if (
          searchTerm &&
          !item?.session.asset.assetName.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return false
        }

        // Filter by time
        const now = new Date()
        const paymentDate = new Date(item.billDate)
        if (
          timeFilter === 'month' &&
          (paymentDate.getMonth() !== now.getMonth() ||
            paymentDate.getFullYear() !== now.getFullYear())
        ) {
          return false
        } else if (timeFilter === 'year' && paymentDate.getFullYear() !== now.getFullYear()) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        // Sort by date
        const dateA = new Date(a.billDate)
        const dateB = new Date(b.billDate)
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
      })
      .map((item) => ({
        billId: item.session.auctionSessionId,
        auctionSessionId: item.session.auctionSessionId,
        asset: {
          assetName: item.session.asset.assetName || 'Không xác định',
          mainImage: item.session.asset.mainImage || '/placeholder.svg?height=60&width=60',
          listImages: item.session.asset.listImages
            ? item.session.asset.listImages.map((img) => ({
              imageAsset: img.imageAsset
            }))
            : []
        },
        billDate: new Date(item.billDate),
        bidPrice: item.totalPrice
      }))
  }, [wonItems, searchTerm, timeFilter, sortOrder])

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Lịch sử thanh toán
        </Typography>

        <Card elevation={0} sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Tìm kiếm theo tên vật phẩm..."
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="action" />
                      </InputAdornment>
                    )
                  }}
                  sx={{ bgcolor: '#f5f5f5', borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <FormControl fullWidth size="small" sx={{ bgcolor: '#f5f5f5', borderRadius: 1 }}>
                  <InputLabel id="time-filter-label">Thời gian</InputLabel>
                  <Select
                    labelId="time-filter-label"
                    value={timeFilter}
                    label="Thời gian"
                    onChange={handleTimeFilterChange}
                  >
                    <MenuItem value="all">Tất cả</MenuItem>
                    <MenuItem value="month">Tháng này</MenuItem>
                    <MenuItem value="year">Năm nay</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                  onClick={handleSortToggle}
                >
                  {sortOrder === 'asc' ? 'Cũ nhất' : 'Mới nhất'}
                </Button>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, minHeight: '400px', maxHeight: '600px', overflowY: 'auto' }}>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <PaymentHistoryItem key={payment.billId} payment={payment} />
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Receipt sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Không tìm thấy giao dịch nào
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  )
}

export default PaymentHistory
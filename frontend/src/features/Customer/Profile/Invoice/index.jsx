import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  ArrowBack,
  Download,
  ContentCopy,
  LocalShipping,
  Receipt,
  CalendarToday,
  AccountBalance,
  Person,
  Phone,
  LocationOn,
  VerifiedUser,
  PictureAsPdf
} from '@mui/icons-material'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './style'
import { useLocation, useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { QRCodeSVG } from 'qrcode.react'
import BackButton from '~/components/BackButton'
import { useCustomNavigate } from '~/utils/navigate'
import { useBillById } from '~/hooks/billHooks'
import { useGetAddressDefaultByUserId } from '~/hooks/addressHook'

const Invoice = () => {
  const { id } = useParams()
  const { state } = useLocation();
  const tabSet = state?.tabSet ?? 7;

  const { data: bill, isLoading: isLoading, isError: isError } = useBillById(id)
  const printRef = useRef()
  const [showPrintableVersion, setShowPrintableVersion] = useState(false)
  const { handleNavigate } = useCustomNavigate();
  const { data: addressDefaut } = useGetAddressDefaultByUserId(bill?.buyerBill.userId)

  // Handle print functionality
  const handlePrint = useReactToPrint({
    content: () => {
      console.log('printRef.current:', printRef.current)
      return printRef.current
    },
    documentTitle: `Hóa-đơn-${id}`,
    onAfterPrint: () => {
      setShowPrintableVersion(false)
      alert('Hóa đơn đã được tải xuống thành công!')
    },
    onPrintError: (error) => {
      console.error('Lỗi khi in:', error)
      alert('Có lỗi xảy ra khi tạo PDF. Vui lòng thử lại!')
    }
  })

  useEffect(() => {
    if (showPrintableVersion && printRef.current) {
      handlePrint()
    }
  }, [showPrintableVersion])

  const handleCopyInvoiceNumber = () => {
    navigator.clipboard.writeText(`INV-${id}`)
    alert('Đã sao chép mã hóa đơn!')
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Đang tải...</Typography>
      </Box>
    )
  }

  if (isError || !bill) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Không tìm thấy thông tin hóa đơn</Typography>
      </Box>
    )
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Hóa đơn đấu giá',
          text: `Hóa đơn thanh toán đấu giá: ${bill?.session?.asset?.assetName}`,
          url: window.location.href
        })
        .catch((error) => console.log('Lỗi chia sẻ:', error))
    } else {
      alert('Trình duyệt của bạn không hỗ trợ tính năng chia sẻ!')
    }
  }

  const handleViewDownload = () => {
    setShowPrintableVersion(true)
  }

  //   const handleConfirmDownload = () => {
  //     handlePrint()
  //   }

  const handleConfirmDownload = () => {
    if (!printRef.current) {
      console.error('printRef.current is null or undefined')
      alert('Không thể tạo PDF. Vui lòng thử lại!')
      return
    }
    handlePrint()
  }

  const handleBackToInvoice = () => {
    setShowPrintableVersion(false)
  }

  // Calculate payment details
  const depositAmount = bill.depositPrice || 0
  const winningBid = bill.bidPrice || 0
  const remainingAmount = winningBid - depositAmount
  const paymentDate = bill.billDate ? new Date(bill.billDate) : new Date();
  const invoiceDate = bill.billDate ? new Date(bill.billDate) : new Date();
  const invoiceNumber = `INV-${bill.billId.substring(0, 8).toUpperCase()}`
  const transactionId = `TX${bill.transactionCode}`

  // Mock shipping information - in a real app, this would come from the user's profile or form input
  const shippingInfo = {
    recipientName: bill?.address?.recipientName,
    phone: bill?.address?.phone,
    address: bill?.address?.addressDetail,
    email: bill?.buyerBill?.email
  }

  // Mock seller information - in a real app, this would come from the auction data
  const sellerInfo = {
    name: bill?.sellerBill?.name || bill?.sellerBill?.username,
    address: addressDefaut?.addressDetail,
    phone: bill?.sellerBill?.phone,
    email: bill?.sellerBill?.email
  }

  return (
    <ThemeProvider theme={theme}>
      {/* Regular view */}
      {!showPrintableVersion && (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <BackButton onClick={() => handleNavigate('/profile', { tabSet })} />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Xem chi tiết để tải xuống">
                <Button variant="outlined" startIcon={<Download />} onClick={handleViewDownload}>
                  Tải xuống
                </Button>
              </Tooltip>
              {/* <Tooltip title="Chia sẻ">
                <Button variant="outlined" startIcon={<Share />} onClick={handleShare}>
                  Chia sẻ
                </Button>
              </Tooltip> */}
            </Box>
          </Box>

          <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Receipt color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                      Hóa Đơn
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ width: 150 }}>
                      Mã hóa đơn:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1" fontWeight="medium">
                        {invoiceNumber}
                      </Typography>
                      <IconButton size="small" onClick={handleCopyInvoiceNumber}>
                        <ContentCopy fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ width: 150 }}>
                      Ngày lập hóa đơn:
                    </Typography>
                    <Typography variant="body1">
                      {invoiceDate.toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ width: 150 }}>
                      Mã giao dịch:
                    </Typography>
                    <Typography variant="body1">{transactionId}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ width: 150 }}>
                      Trạng thái:
                    </Typography>
                    <Chip label="Đã thanh toán" color="success" size="small" sx={{ fontWeight: 'medium', px: 1 }} />
                  </Box>
                </Grid>
                <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Box sx={{ textAlign: 'right' }}>
                    <QRCodeSVG
                      value={`${window.location.origin}/invoice/${id}`}
                      size={120}
                      level="H"
                      includeMargin={true}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                      Quét mã để xem hóa đơn
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Thông tin người bán
                  </Typography>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                    <Typography variant="body1" fontWeight="bold">
                      {sellerInfo.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Địa chỉ: {sellerInfo.address}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Điện thoại: {sellerInfo.phone}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Email: {sellerInfo.email}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Thông tin người nhận
                  </Typography>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                    <Typography variant="body1" fontWeight="bold">
                      {shippingInfo.recipientName}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Địa chỉ: {shippingInfo.address}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Điện thoại: {shippingInfo.phone}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Email: {shippingInfo.email}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Chi tiết vật phẩm
                </Typography>
                <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
                  <Table>
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell width="50%">Mô tả</TableCell>
                        <TableCell align="right">Giá khởi điểm</TableCell>
                        <TableCell align="right">Giá thắng cuộc</TableCell>
                        <TableCell align="right">Thành tiền</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                              component="img"
                              src={
                                bill.session.asset.mainImage ||
                                (bill.session.asset.listImages && bill.session.asset.listImages[0]?.imageAsset) ||
                                '/placeholder.svg?height=60&width=60'
                              }
                              alt={bill.session.asset.assetName}
                              sx={{ width: 60, height: 60, borderRadius: 1, mr: 2, objectFit: 'cover' }}
                            />
                            <Box>
                              <Typography variant="body1" fontWeight="medium">
                                {bill.session.asset.assetName}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Mã vật phẩm: {bill.session.asset.assetId || id.substring(0, 8).toUpperCase()}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          {bill.session.startingBids?.toLocaleString('vi-VN') || '0'} VNĐ
                        </TableCell>
                        <TableCell align="right">{winningBid.toLocaleString('vi-VN')} VNĐ</TableCell>
                        <TableCell align="right">{winningBid.toLocaleString('vi-VN')} VNĐ</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Thông tin thanh toán
                    </Typography>
                    <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarToday fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Ngày thanh toán:
                        </Typography>
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {paymentDate.toLocaleDateString('vi-VN', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                          })}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AccountBalance fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Phương thức thanh toán:
                        </Typography>
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          Chuyển khoản ngân hàng
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <VerifiedUser fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Trạng thái:
                        </Typography>
                        <Typography variant="body2" color="success.main" fontWeight="medium" sx={{ ml: 1 }}>
                          Đã thanh toán
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Tổng kết
                    </Typography>
                    <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">Giá thắng cuộc:</Typography>
                        <Typography variant="body1">{winningBid.toLocaleString('vi-VN')} VNĐ</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">Tiền cọc đã đóng:</Typography>
                        <Typography variant="body1" color="success.main">
                          - {depositAmount.toLocaleString('vi-VN')} VNĐ
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 1 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1" fontWeight="bold">
                          Số tiền đã thanh toán:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold" color="success.main">
                          {remainingAmount.toLocaleString('vi-VN')} VNĐ
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1" fontWeight="bold">
                          Tổng thanh toán:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {winningBid.toLocaleString('vi-VN')} VNĐ
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Thông tin giao hàng
                </Typography>
                <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Person color="primary" sx={{ mr: 1, mt: 0.5, fontSize: 20 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Người nhận
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {shippingInfo.recipientName}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Phone color="primary" sx={{ mr: 1, mt: 0.5, fontSize: 20 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Số điện thoại
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {shippingInfo.phone}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <LocalShipping color="primary" sx={{ mr: 1, mt: 0.5, fontSize: 20 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Phương thức vận chuyển
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            Giao hàng tiêu chuẩn
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <LocationOn color="primary" sx={{ mr: 1, mt: 0.5, fontSize: 20 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Địa chỉ giao hàng
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {shippingInfo.address}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>

              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Đây là hóa đơn điện tử hợp lệ. Mọi thắc mắc xin vui lòng liên hệ với chúng tôi qua email{' '}
                  <Typography component="span" color="primary.main">
                    {sellerInfo.email}
                  </Typography>{' '}
                  hoặc số điện thoại{' '}
                  <Typography component="span" color="primary.main">
                    {sellerInfo.phone}
                  </Typography>
                  .
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      )}

      {/* Download Preview View */}
      {showPrintableVersion && (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
          <Container maxWidth="lg">
            {/* Header with back button and download confirmation */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                p: 3,
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={handleBackToInvoice}
                sx={{ borderRadius: 2 }}
              >
                Quay lại chi tiết hóa đơn
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  Xem trước hóa đơn PDF
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PictureAsPdf />}
                  onClick={handleConfirmDownload}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                  }}
                >
                  Xác nhận tải xuống PDF
                </Button>
              </Box>
            </Box>

            {/* <Box ref={printRef}>
              <Typography>Test PDF</Typography>
            </Box> */}

            {/* PDF Preview */}
            <Box
              ref={printRef}
              sx={{
                p: 4,
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                width: '210mm', // A4 width
                minHeight: '297mm', // A4 height
                mx: 'auto',
                fontFamily: 'Arial, sans-serif',
                '@media print': {
                  p: 2,
                  boxShadow: 'none',
                  borderRadius: 0
                }
              }}
            >
              {/* Invoice Header */}
              <Box sx={{ mb: 4 }}>
                <Grid container spacing={3} alignItems="flex-start">
                  <Grid item xs={12} md={6}>
                    <Typography variant="h4" fontWeight="bold" color="primary.main" gutterBottom>
                      HÓA ĐƠN THANH TOÁN
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      AUCTION INVOICE
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
                        {sellerInfo.name}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        <strong>MST:</strong> {sellerInfo.taxId}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        <strong>ĐT:</strong> {sellerInfo.phone}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        <strong>Email:</strong> {sellerInfo.email}
                      </Typography>
                      <Box sx={{ mt: 1, maxWidth: { xs: '100%', md: '300px' }, ml: { xs: 0, md: 'auto' } }}>
                        <Typography
                          variant="body2"
                          sx={{
                            wordBreak: 'break-word',
                            lineHeight: 1.4
                          }}
                        >
                          <strong>Địa chỉ:</strong> {sellerInfo.address}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ mb: 4, borderWidth: 2 }} />

              {/* Invoice Details */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 1, border: '1px solid #e9ecef' }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary.main">
                      THÔNG TIN HÓA ĐƠN
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Mã hóa đơn:
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {invoiceNumber}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Ngày lập:
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {invoiceDate.toLocaleDateString('vi-VN')}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Mã giao dịch:
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {transactionId}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Trạng thái:
                        </Typography>
                        <Typography variant="body1" color="success.main" fontWeight="bold">
                          ĐÃ THANH TOÁN
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 1, border: '1px solid #e9ecef' }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary.main">
                      THÔNG TIN KHÁCH HÀNG
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" gutterBottom>
                      {shippingInfo.recipientName}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Điện thoại:</strong> {shippingInfo.phone}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        wordBreak: 'break-word',
                        lineHeight: 1.4
                      }}
                    >
                      <strong>Địa chỉ:</strong> {shippingInfo.address}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Người thắng đấu giá:</strong>{' '}
                      {bill?.buyerBill?.user?.name || 'Không có thông tin'}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Item Details */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
                  CHI TIẾT VẬT PHẨM
                </Typography>
                <TableContainer component={Paper} elevation={0} sx={{ border: '2px solid #e9ecef', borderRadius: 1 }}>
                  <Table>
                    <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                      <TableRow>
                        <TableCell width="45%" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                          MÔ TẢ VẬT PHẨM
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                          GIÁ KHỞI ĐIỂM
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                          GIÁ THẮNG CUỘC
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                          THÀNH TIỀN
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ py: 2 }}>
                          <Typography variant="body1" fontWeight="bold" gutterBottom>
                            {bill.session.asset.assetName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Mã vật phẩm: {bill.session.asset.assetId || id.substring(0, 8).toUpperCase()}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ py: 2 }}>
                          <Typography variant="body1" fontWeight="medium">
                            {bill.session.startingBids?.toLocaleString('vi-VN') || '0'} VNĐ
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ py: 2 }}>
                          <Typography variant="body1" fontWeight="bold" color="primary.main">
                            {winningBid.toLocaleString('vi-VN')} VNĐ
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ py: 2 }}>
                          <Typography variant="body1" fontWeight="bold" color="primary.main">
                            {winningBid.toLocaleString('vi-VN')} VNĐ
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              {/* Payment Information */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 1, border: '1px solid #e9ecef' }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary.main">
                      THÔNG TIN THANH TOÁN
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Ngày thanh toán:
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {paymentDate.toLocaleDateString('vi-VN')}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Phương thức:
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          Chuyển khoản
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, bgcolor: '#fff3cd', borderRadius: 1, border: '1px solid #ffeaa7' }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary.main">
                      TỔNG KẾT THANH TOÁN
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Giá thắng cuộc:</Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {winningBid.toLocaleString('vi-VN')} VNĐ
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Tiền cọc đã đóng:</Typography>
                      <Typography variant="body2" color="success.main" fontWeight="medium">
                        - {depositAmount.toLocaleString('vi-VN')} VNĐ
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" fontWeight="bold">
                        Số tiền đã thanh toán:
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" color="error.main">
                        {remainingAmount.toLocaleString('vi-VN')} VNĐ
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        p: 1,
                        bgcolor: 'primary.main',
                        borderRadius: 1,
                        mt: 1
                      }}
                    >
                      <Typography variant="body1" fontWeight="bold" color="white">
                        TỔNG CỘNG:
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" color="white">
                        {winningBid.toLocaleString('vi-VN')} VNĐ
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* Shipping Information */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
                  THÔNG TIN GIAO HÀNG
                </Typography>
                <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 1, border: '1px solid #e9ecef' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Người nhận:
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {shippingInfo.recipientName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Số điện thoại:
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {shippingInfo.phone}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Phương thức vận chuyển:
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        Giao hàng tiêu chuẩn
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Địa chỉ giao hàng:
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="medium"
                        sx={{
                          wordBreak: 'break-word',
                          lineHeight: 1.4
                        }}
                      >
                        {shippingInfo.address}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              {/* Footer */}
              <Box sx={{ mt: 6, pt: 3, borderTop: '2px solid #e9ecef' }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      <strong>Lưu ý:</strong> Đây là hóa đơn điện tử hợp lệ được tạo tự động bởi hệ thống.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Mọi thắc mắc xin vui lòng liên hệ với chúng tôi qua email <strong>{sellerInfo.email}</strong> hoặc
                      số điện thoại <strong>{sellerInfo.phone}</strong>.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Ngày in:{' '}
                      {new Date().toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                      <QRCodeSVG value={`${window.location.origin}/invoice/${id}`} size={100} level="H" includeMargin={true} />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </ThemeProvider>
  )
}

export default Invoice

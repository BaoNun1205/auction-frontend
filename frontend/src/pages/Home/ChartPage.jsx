import React, { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  Container,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Avatar,
  AvatarGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  IconButton
} from '@mui/material'
import {
  TrendingUp,
  TrendingDown,
  FiberManualRecord as FiberManualRecordIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  CardGiftcard as CardGiftcardIcon,
  Chat as ChatIcon,
  Settings as SettingsIcon
} from '@mui/icons-material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Area,
  Legend
} from 'recharts'
import { useCountActiveUsers } from '~/hooks/userHook'
import { useCountActiveAuctionSessions } from '~/hooks/sessionHook'

// Dữ liệu mẫu cho biểu đồ
const visitorDataMonth = [
  { name: 'Th1', luotTruyCap: 75, phien: 110 },
  { name: 'Th2', luotTruyCap: 85, phien: 60 },
  { name: 'Th3', luotTruyCap: 100, phien: 150 },
  { name: 'Th4', luotTruyCap: 90, phien: 35 },
  { name: 'Th5', luotTruyCap: 105, phien: 60 },
  { name: 'Th6', luotTruyCap: 90, phien: 30 },
  { name: 'Th7', luotTruyCap: 115, phien: 25 },
  { name: 'Th8', luotTruyCap: 100, phien: 65 },
  { name: 'Th9', luotTruyCap: 85, phien: 55 },
  { name: 'Th10', luotTruyCap: 115, phien: 55 },
  { name: 'Th11', luotTruyCap: 85, phien: 40 },
  { name: 'Th12', luotTruyCap: 40, phien: 40 }
]

const visitorDataWeek = [
  { name: 'T2', luotTruyCap: 20, phien: 30 },
  { name: 'T3', luotTruyCap: 25, phien: 40 },
  { name: 'T4', luotTruyCap: 15, phien: 20 },
  { name: 'T5', luotTruyCap: 30, phien: 35 },
  { name: 'T6', luotTruyCap: 28, phien: 25 },
  { name: 'T7', luotTruyCap: 22, phien: 15 },
  { name: 'CN', luotTruyCap: 18, phien: 10 }
]

const incomeData = [
  { day: 'T2', soTien: 950 },
  { day: 'T3', soTien: 1150 },
  { day: 'T4', soTien: 850 },
  { day: 'T5', soTien: 550 },
  { day: 'T6', soTien: 800 },
  { day: 'T7', soTien: 680 },
  { day: 'CN', soTien: 950 }
]

// Dữ liệu mẫu cho biểu đồ
const analyticsChartData = [
  { name: 'Th6', value: 400 },
  { name: 'Th7', value: 800 },
  { name: 'Th8', value: 300 },
  { name: 'Th9', value: 500 },
  { name: 'Th10', value: 400 },
  { name: 'Th11', value: 600 },
  { name: 'Th12', value: 300 }
]

// Dữ liệu mẫu cho bảng đơn hàng
const ordersData = [
  { id: '13256498', product: 'Bàn Phím', total: 125, status: 'Từ Chối', amount: '1.600.000 VNĐ' },
  { id: '13286564', product: 'Phụ Kiện Máy Tính', total: 100, status: 'Đã Duyệt', amount: '1.900.000 VNĐ' },
  { id: '84564564', product: 'Ống Kính Máy Ảnh', total: 40, status: 'Từ Chối', amount: '920.000 VNĐ' },
  { id: '86739658', product: 'TV', total: 99, status: 'Đang Chờ', amount: '9.300.000 VNĐ' },
  { id: '98652366', product: 'Tai Nghe', total: 50, status: 'Đã Duyệt', amount: '230.000 VNĐ' },
  { id: '98753263', product: 'Chuột', total: 89, status: 'Từ Chối', amount: '240.000 VNĐ' },
  { id: '98753275', product: 'Máy Tính Để Bàn', total: 185, status: 'Đã Duyệt', amount: '2.200.000 VNĐ' },
  { id: '98753291', product: 'Ghế', total: 100, status: 'Đang Chờ', amount: '320.000 VNĐ' },
  { id: '98756325', product: 'Điện Thoại', total: 355, status: 'Đã Duyệt', amount: '2.100.000 VNĐ' },
  { id: '98764564', product: 'Laptop', total: 300, status: 'Đang Chờ', amount: '4.100.000 VNĐ' }
]

// Dữ liệu phân tích
const analyticsData = [
  { label: 'Tăng Trưởng Tài Chính Công Ty', value: '+45.14%' },
  { label: 'Tỷ Lệ Chi Phí Công Ty', value: '0.58%' },
  { label: 'Rủi Ro Kinh Doanh', value: 'Thấp' }
]

// Dữ liệu báo cáo bán hàng
const salesReportData = [
  { month: 'Th1', income: 1800000, cost: 1200000 },
  { month: 'Th2', income: 900000, cost: 450000 },
  { month: 'Th3', income: 1350000, cost: 750000 },
  { month: 'Th4', income: 1150000, cost: 1500000 },
  { month: 'Th5', income: 1200000, cost: 1700000 },
  { month: 'Th6', income: 1450000, cost: 1000000 },
  { month: 'Th7', income: 1700000, cost: 1800000 },
  { month: 'Th8', income: 2000000, cost: 2200000 },
  { month: 'Th9', income: 1700000, cost: 1800000 },
  { month: 'Th10', income: 2300000, cost: 2100000 },
  { month: 'Th11', income: 2100000, cost: 2200000 },
  { month: 'Th12', income: 1800000, cost: 2000000 }
]

// Dữ liệu lịch sử giao dịch
const transactionData = [
  {
    id: '002434',
    date: 'Hôm nay, 2:00 Sáng',
    amount: '+32.000.000 VNĐ',
    percentage: '78%',
    icon: <CardGiftcardIcon sx={{ color: '#4caf50' }} />
  },
  {
    id: '984947',
    date: '5 Tháng 8, 1:45 Chiều',
    amount: '+6.800.000 VNĐ',
    percentage: '8%',
    icon: <ChatIcon sx={{ color: '#2196f3' }} />
  },
  {
    id: '988784',
    date: '7 giờ trước',
    amount: '+15.400.000 VNĐ',
    percentage: '16%',
    icon: <SettingsIcon sx={{ color: '#f44336' }} />
  }
]

const Dashboard = () => {
  const theme = useTheme()
  const [timeView, setTimeView] = useState('thang')
  const visitorData = timeView === 'thang' ? visitorDataMonth : visitorDataWeek
  const [showIncome, setShowIncome] = useState(true)
  const [showCost, setShowCost] = useState(true)
  const { data: countActiveUsers, isLoading: isLoadingActiveUser } = useCountActiveUsers()
  const { data: countActiveSession, isLoading: isLoadingActiveSession } = useCountActiveAuctionSessions()

  const metricCards = [
    {
      title: 'Tổng Lượt Truy Cập',
      value: '442,236',
      change: '59.3%',
      isPositive: true,
      extra: '35,000'
    },
    {
      title: 'Tổng Người Dùng',
      value: isLoadingActiveUser ? 'Đang tải...' : countActiveUsers.totalCount.toLocaleString(),
      change: isLoadingActiveUser
        ? 'Đang tải...'
        : `${Math.abs(countActiveUsers.growthRate).toLocaleString()}%`,
      isPositive: isLoadingActiveUser
        ? true
        : (countActiveUsers.growthRate ?? 0) >= 0,
      extra: isLoadingActiveUser ? 'Đang tải...' : countActiveUsers.countOfYear.toLocaleString()
    },
    {
      title: 'Tổng phiên đấu giá',
      value: isLoadingActiveSession ? 'Đang tải...' : countActiveSession?.totalCount?.toLocaleString(),
      change: isLoadingActiveSession
        ? 'Đang tải...'
        : `${Math.abs(countActiveSession?.growthRate ?? 0).toLocaleString()}%`,
      isPositive: isLoadingActiveSession
        ? false
        : (countActiveSession?.growthRate ?? 0) >= 0,
      extra: isLoadingActiveSession ? 'Đang tải...' : countActiveSession?.countOfYear?.toLocaleString()
    },
    {
      title: 'Tổng Doanh Thu',
      value: '35.000.000 VNĐ',
      change: '27.4%',
      isPositive: false,
      extra: '20,395'
    }
  ]

  // Các style được tái sử dụng
  const paperStyle = {
    p: 2,
    borderRadius: 2,
    elevation: 0,
    variant: 'outlined'
  }

  const chartColors = {
    primary: '#1976d2',
    secondary: '#0d47a1',
    bar: '#4dd0e1',
    income: '#FFA726',
    cost: '#2196F3'
  }

  // Hàm xác định màu trạng thái
  const getStatusColor = (status) => {
    switch (status) {
    case 'Đã Duyệt':
      return 'success'
    case 'Từ Chối':
      return 'error'
    case 'Đang Chờ':
      return 'warning'
    default:
      return 'default'
    }
  }

  // Component thẻ chỉ số
  const MetricCard = ({ title, value, change, isPositive, extra }) => (
    <Paper
      sx={{
        ...paperStyle,
        display: 'flex',
        flexDirection: 'column',
        height: 200
      }}
      elevation={0}
      variant="outlined"
    >
      <Typography color="text.secondary" variant="body2" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
        {value}
      </Typography>
      <Chip
        icon={isPositive ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
        label={change}
        size="small"
        sx={{
          width: 'fit-content',
          backgroundColor: isPositive ? 'rgb(85, 154, 223)' : 'rgba(255, 152, 0, 0.1)',
          color: isPositive ? 'primary.main' : 'warning.main',
          '& .MuiChip-icon': {
            color: isPositive ? 'primary.main' : 'warning.main'
          }
        }}
      />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mt: 'auto',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          width: '100%' // Đảm bảo chiều rộng tối đa
        }}
      >
      Bạn đã kiếm thêm <Box component="span" sx={{ fontWeight: 'bold' }}>{extra}</Box> trong năm nay
      </Typography>
    </Paper>
  )

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
        Bảng Điều Khiển
      </Typography>

      {/* Thẻ Chỉ Số */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metricCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MetricCard {...card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Biểu Đồ Khách Truy Cập */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              ...paperStyle,
              display: 'flex',
              flexDirection: 'column',
              height: 500
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">
                Thống kê khách truy cập
              </Typography>
              <ToggleButtonGroup
                value={timeView}
                exclusive
                onChange={(e, newValue) => newValue && setTimeView(newValue)}
                size="small"
                sx={{
                  '& .MuiToggleButton-root': {
                    borderRadius: 2,
                    px: 3,
                    mx: 0.5,
                    border: '1px solid #ccc',
                    color: '#555',
                    backgroundColor: '#f9f9f9',
                    '&:hover': {
                      backgroundColor: '#e0e0e0'
                    }
                  },
                  '& .MuiToggleButton-root.Mui-selected': {
                    color: '#1976d2',
                    borderColor: '#1976d2',
                    '&:hover': {
                      backgroundColor: '#e3f2fd'
                    }
                  }
                }}
              >
                <ToggleButton value="thang">Tháng</ToggleButton>
                <ToggleButton value="tuan">Tuần</ToggleButton>
              </ToggleButtonGroup>

            </Box>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={visitorData}
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
              >
                <defs>
                  <linearGradient id="colorLuotTruyCap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [`${value}`, '']}
                />
                <Area
                  type="monotone"
                  dataKey="luotTruyCap"
                  stroke={chartColors.primary}
                  fillOpacity={1}
                  fill="url(#colorLuotTruyCap)"
                />
                <Line
                  type="monotone"
                  dataKey="luotTruyCap"
                  stroke={chartColors.primary}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                  name="Lượt truy cập"
                />
                <Line
                  type="monotone"
                  dataKey="phien"
                  stroke={chartColors.secondary}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                  name="Phiên"
                />
              </LineChart>
            </ResponsiveContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: chartColors.primary }} />
                <Typography variant="body2">Lượt truy cập</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: chartColors.secondary }} />
                <Typography variant="body2">Phiên</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Tổng Quan Thu Nhập */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              ...paperStyle,
              display: 'flex',
              flexDirection: 'column',
              height: 500
            }}
          >
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Tổng Quan Thu Nhập
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              Thống Kê Tuần Này
            </Typography>
            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 3 }}>
              86.650.000 VNĐ
            </Typography>
            <ResponsiveContainer width="100%" height="70%">
              <BarChart
                data={incomeData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()} VNĐ`, 'Doanh thu']}
                  contentStyle={{ borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                />
                <Bar
                  dataKey="soTien"
                  fill={chartColors.bar}
                  radius={[5, 5, 0, 0]}
                  barSize={36}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Phần Đơn Hàng Gần Đây và Báo Cáo Phân Tích */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Phần Đơn Hàng Gần Đây */}
        <Grid item xs={12} md={7}>
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Đơn Hàng Gần Đây
            </Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>MÃ THEO DÕI</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>TÊN SẢN PHẨM</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>TỔNG ĐƠN HÀNG</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>TRẠNG THÁI</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>TỔNG SỐ TIỀN</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ordersData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.product}</TableCell>
                      <TableCell>{row.total}</TableCell>
                      <TableCell>
                        <Chip
                          icon={<FiberManualRecordIcon fontSize="small" />}
                          label={row.status}
                          color={getStatusColor(row.status)}
                          size="small"
                          sx={{
                            '& .MuiChip-icon': {
                              color: 'inherit',
                              marginLeft: '5px',
                              marginRight: '-4px'
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>{row.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>

        {/* Phần Báo Cáo Phân Tích */}
        <Grid item xs={12} md={5}>
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Báo Cáo Phân Tích
            </Typography>
            <Paper sx={{ p: 2, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
              {analyticsData.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: index < analyticsData.length - 1 ? 2 : 0,
                    py: 1
                  }}
                >
                  <Typography variant="body1">{item.label}</Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 'bold',
                      color: item.label.includes('Tăng Trưởng') ? 'success.main' : 'text.primary'
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}

              {/* Biểu Đồ */}
              <Box sx={{ height: 300, mt: 4 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={analyticsChartData}
                    margin={{
                      top: 5,
                      right: 5,
                      left: 5,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#FFB000"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* Sales Report and Transaction History Section */}
      <Grid container spacing={3}>
        {/* Phần Báo Cáo Bán Hàng */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Báo Cáo Bán Hàng
              </Typography>
              <Button
                variant="outlined"
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  color: 'text.primary',
                  borderColor: 'divider'
                }}
              >
                Hôm Nay
              </Button>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Lợi Nhuận Ròng
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', my: 1 }}>
                35.000.000 VNĐ
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showIncome}
                      onChange={(e) => setShowIncome(e.target.checked)}
                      sx={{
                        color: chartColors.income,
                        '&.Mui-checked': {
                          color: chartColors.income
                        }
                      }}
                    />
                  }
                  label="Thu Nhập"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showCost}
                      onChange={(e) => setShowCost(e.target.checked)}
                      sx={{
                        color: chartColors.cost,
                        '&.Mui-checked': {
                          color: chartColors.cost
                        }
                      }}
                    />
                  }
                  label="Chi Phí Bán Hàng"
                />
              </Box>
            </Box>

            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesReportData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  barGap={0}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  {showIncome && (
                    <Bar
                      dataKey="income"
                      fill={chartColors.income}
                      name="Thu Nhập"
                      radius={[0, 0, 0, 0]}
                      barSize={20}
                    />
                  )}
                  {showCost && (
                    <Bar
                      dataKey="cost"
                      fill={chartColors.cost}
                      name="Chi Phí Bán Hàng"
                      radius={[0, 0, 0, 0]}
                      barSize={20}
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Phần Lịch Sử Giao Dịch */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, boxShadow: 'none', border: '1px solid #e0e0e0', height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Lịch Sử Giao Dịch
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {transactionData.map((transaction, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.02)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: 'background.paper',
                        width: 40,
                        height: 40,
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      {transaction.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                        Đơn Hàng #{transaction.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {transaction.date}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                      {transaction.amount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {transaction.percentage}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard
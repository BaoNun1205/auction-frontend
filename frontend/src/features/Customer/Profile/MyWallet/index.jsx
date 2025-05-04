import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer
} from '@mui/material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import AddIcon from '@mui/icons-material/Add'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { UseGetBalanceHistory } from '~/hooks/balanceHistoryHook'
import { UseGetBalanceUser } from '~/hooks/balanceUserHook'
import { useAppStore } from '~/store/appStore'
import DepositDialog from './DepositDialog'

const MyWallet = () => {
  const [walletInfo, setWalletInfo] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [depositDialogOpen, setDepositDialogOpen] = useState(false)
  const { auth } = useAppStore()

  const { data: walletData, isLoading: walletLoading } = UseGetBalanceUser(auth.user.id)
  const { data: transactionsData, isLoading: transactionsLoading } = UseGetBalanceHistory(auth.user.id)

  useEffect(() => {
    if (!walletLoading && !transactionsLoading) {
      setWalletInfo(walletData)
      setTransactions(transactionsData)
      setLoading(false)
    }
  }, [walletLoading, transactionsLoading, walletData, transactionsData])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: vi })
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Thông tin ví
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDepositDialogOpen(true)}
          sx={{
            backgroundColor: '#b41712',
            '&:hover': { backgroundColor: '#8b120e' }
          }}
        >
          Nạp tiền
        </Button>
      </Box>

      {walletInfo ? (
        <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <AccountBalanceWalletIcon sx={{ fontSize: 40, color: '#b41712' }} />
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle1" color="text.secondary">
                  ID ví
                </Typography>
                <Typography variant="h6">
                  {walletInfo.balanceUserId}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" color="text.secondary">
                  Số dư
                </Typography>
                <Typography variant="h5" color="#b41712" sx={{ fontWeight: 'bold' }}>
                  {formatCurrency(walletInfo.accountBalance)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <Paper sx={{ p: 2, mb: 4, borderRadius: 2 }}>
          <Typography color="error">Không có thông tin ví</Typography>
        </Paper>
      )}

      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Lịch sử giao dịch
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#b41712' }}>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ID giao dịch</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Số tiền</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Nội dung</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Ngày</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.balanceHistoryId}
                sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
              >
                <TableCell>{transaction.balanceHistoryId}</TableCell>
                <TableCell>
                  <Chip
                    label={formatCurrency(transaction.amount)}
                    color={transaction.actionbalance === 'ADD' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{formatDate(transaction.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DepositDialog
        open={depositDialogOpen}
        onClose={() => setDepositDialogOpen(false)}
      />
    </Box>
  )
}

export default MyWallet

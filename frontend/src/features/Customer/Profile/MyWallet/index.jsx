import React, { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress, Paper } from '@mui/material'
import { UseGetBalanceHistory } from '../../../../hooks/balanceHistoryHook'
import { UseGetBalanceUser } from '../../../../hooks/balanceUserHook'
import { useAppStore } from '~/store/appStore'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer
} from '@mui/material'

const MyWallet = () => {
  const [walletInfo, setWalletInfo] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
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

  if (loading) {
    return <CircularProgress />
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Thông tin ví
      </Typography>
      {walletInfo ? (
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Typography>ID ví: {walletInfo.balanceUserId}</Typography>
          <Typography>Số dư: {walletInfo.accountBalance}</Typography>
        </Paper>
      ) : (
        <Typography>Không có thông tin ví</Typography>
      )}
      <Typography variant="h6" gutterBottom>
        Giao dịch
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID giao dịch</TableCell>
              <TableCell>Số tiền</TableCell>
              <TableCell>Nội dung</TableCell>
              <TableCell>Ngày</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.balanceHistoryId}>
                <TableCell>{transaction.balanceHistoryId}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default MyWallet
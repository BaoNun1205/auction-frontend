import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Slide,
  Fade,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useGetAuctionHistoriesByAuctionSessionId } from '~/hooks/auctionHistoryHook';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    [theme.breakpoints.up('sm')]: {
      minWidth: 600,
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 800,
    },
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 3),
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: 400,
  '&::-webkit-scrollbar': {
    width: 8,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.grey[200],
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const AuctionHistoryDialog = ({ auctionHistory, open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' }}
    >
      <StyledDialogTitle>
        <Typography variant="h6">Lịch sử đấu giá</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: 'inherit' }}
        >
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      <DialogContent>
        {auctionHistory.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ my: 2 }}>
            Chưa có người đặt giá
          </Typography>
        ) : (
          <StyledTableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <Box display="flex" alignItems="center">
                      <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                      Thời gian
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box display="flex" alignItems="center">
                      <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                      Người đấu giá
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Box display="flex" alignItems="center" justifyContent="flex-end">
                      <MonetizationOnIcon fontSize="small" sx={{ mr: 1 }} />
                      Số tiền đấu giá
                    </Box>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {auctionHistory.map((history, index) => (
                  <Fade in={true} key={index} style={{ transitionDelay: `${index * 50}ms` }}>
                    <StyledTableRow>
                      <StyledTableCell>
                        {new Date(history.bidTime).toLocaleString('vi-VN')}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar src={history.user.avatar} alt={history.user.username} sx={{ mr: 2 }} />
                          <Typography>{history.user.username}</Typography>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Chip
                          label={`${history.bidPrice.toLocaleString('vi-VN')} VND`}
                          color="primary"
                          variant="outlined"
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  </Fade>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}
      </DialogContent>
    </StyledDialog>
  );
};

export default AuctionHistoryDialog;


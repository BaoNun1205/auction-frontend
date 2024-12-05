import { styled } from '@mui/system'; // Import styled from MUI system
import { TableContainer, TableRow, TableCell, Box } from '@mui/material';  // Import MUI components

// Styled components
export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: "70vh",
  "& .MuiTableCell-root": {
    borderColor: "#e0e0e0",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f5f5f5",
  },
  "&:hover": {
    backgroundColor: "#eeeeee",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: "#000000",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#333333",
  },
}));

export const SearchContainer = styled(Box)({
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

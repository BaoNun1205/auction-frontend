// import React, { useState } from 'react'
// import {
//   Box,
//   Typography,
//   IconButton,
//   MenuItem
// } from '@mui/material'
// import { PageInfoContainer, PaginationContainer, RowsPerPageContainer, SelectPage, StyledIconButton } from './style'
// import { ChevronLeft, ChevronRight } from '@mui/icons-material'

// export default function PaginationControl() {
//   const [page, setPage] = useState(0)
//   const [rowsPerPage, setRowsPerPage] = useState(10)
//   const totalItems = 20 // This should be the actual total number of items

//   const handleChangePage = (newPage) => {
//     setPage(newPage)
//   }

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10))
//     setPage(0)
//   }

//   return (
//     <PaginationContainer>
//       <RowsPerPageContainer>
//         <Typography variant="body2" sx={{ mr: 2 }}>
//           Rows per page:
//         </Typography>
//         <SelectPage
//           value={rowsPerPage}
//           onChange={handleChangeRowsPerPage}
//         >
//           <MenuItem value={5}>5</MenuItem>
//           <MenuItem value={10}>10</MenuItem>
//           <MenuItem value={25}>25</MenuItem>
//         </SelectPage>
//       </RowsPerPageContainer>
//       <PageInfoContainer>
//         <Typography variant="body2" sx={{ mr: 2 }}>
//           {`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, totalItems)} of ${totalItems}`}
//         </Typography>
//         <StyledIconButton
//           onClick={() => handleChangePage(page - 1)}
//           disabled={page === 0}
//         >
//           <ChevronLeft size={20} />
//         </StyledIconButton>
//         <StyledIconButton
//           onClick={() => handleChangePage(page + 1)}
//           disabled={page >= Math.ceil(totalItems / rowsPerPage) - 1}
//         >
//           <ChevronRight size={20} />
//         </StyledIconButton>
//       </PageInfoContainer>
//     </PaginationContainer>
//   )
// }

import React from 'react';
import {
  Box,
  Typography,
  MenuItem
} from '@mui/material';
import { PageInfoContainer, PaginationContainer, RowsPerPageContainer, SelectPage, StyledIconButton } from './style';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export default function PaginationControl({ page, rowsPerPage, totalItems, onPageChange, onRowsPerPageChange }) {
  return (
    <PaginationContainer>
      <RowsPerPageContainer>
        <Typography variant="body2" sx={{ mr: 2 }}>
          Rows per page:
        </Typography>
        <SelectPage
          value={rowsPerPage}
          onChange={(event) => onRowsPerPageChange(parseInt(event.target.value, 10))}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
        </SelectPage>
      </RowsPerPageContainer>
      <PageInfoContainer>
        <Typography variant="body2" sx={{ mr: 2 }}>
          {`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, totalItems)} of ${totalItems}`}
        </Typography>
        <StyledIconButton
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
        >
          <ChevronLeft size={20} />
        </StyledIconButton>
        <StyledIconButton
          onClick={() => onPageChange(page + 1)}
          disabled={page >= Math.ceil(totalItems / rowsPerPage) - 1}
        >
          <ChevronRight size={20} />
        </StyledIconButton>
      </PageInfoContainer>
    </PaginationContainer>
  );
}
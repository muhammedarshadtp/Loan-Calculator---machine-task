import React, { useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TablePagination
} from '@mui/material';
import useExchangeRates from '../Hooks/useExchangeRate';

export default function ExchangeRates() {
  const rates = useExchangeRates('USD');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const rows = Object.entries(rates).map(([code, rate]) => ({ code, rate }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ px: 4, py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Live Exchange Rates (Base: USD)
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="exchange rate table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Currency</strong></TableCell>
              <TableCell><strong>Rate</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.code}>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.rate.toFixed(4)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}

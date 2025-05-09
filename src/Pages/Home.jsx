import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import useEmiCalculation from '../Hooks/useEmiCalculate';
import { useThemeCurrency } from '../Context/Theme currencyContextApi';
import useExchangeRates from '../Hooks/useExchangeRate';

export default function Home() {
  const [amount, setAmount] = useState('100000');
  const [rate, setRate] = useState('8.5');
  const [years, setYears] = useState('5');
  const [emi, setEmi] = useState(0);

  const { calculate, schedule } = useEmiCalculation();
  const { currency, setCurrency } = useThemeCurrency();
  const rates = useExchangeRates('USD');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCalc = () => {
    const a = parseFloat(amount), r = parseFloat(rate), y = parseFloat(years);
    if (isNaN(a) || isNaN(r) || isNaN(y)) {
      alert('Please enter valid numbers.');
      return;
    }
    setEmi(calculate(a, r, y));
  };

  const handleReset = () => window.location.reload();

  return (
    <Box sx={{ px: isMobile ? 2 : 10, py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Loan Calculator Dashboard
      </Typography>

      {/* Inputs */}
      <Grid container spacing={2}>
        {[
          ['Loan Amount', amount, setAmount],
          ['Interest Rate (%)', rate, setRate],
          ['Term (Years)', years, setYears],
        ].map(([label, val, setter]) => (
          <Grid item xs={12} md={4} key={label}>
            <TextField
              label={label}
              variant="outlined"
              fullWidth
              value={val}
              onChange={e => setter(e.target.value)}
              type="text"
            />
          </Grid>
        ))}
      </Grid>

      {/* Calculate */}
      <Box sx={{ mt: 3, textAlign: 'left' }}>
        <Button variant="contained" size="large" onClick={handleCalc}>
          CALCULATE
        </Button>
      </Box>

      {emi > 0 && (
        <Box sx={{ mt: 4 }}>
          {/* Monthly EMI */}
          <Typography variant="h6" gutterBottom>
            Monthly EMI: ${emi.toFixed(2)}
          </Typography>

          {/* Currency + Converted EMI + Reset */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              mb: 2,
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FormControl size="small" sx={{ minWidth: 72 }}>
                <InputLabel>Currency</InputLabel>
                <Select
                  label="Currency"
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="INR">INR</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
                Converted EMI: {(emi * (rates[currency] || 1)).toFixed(2)} {currency}
              </Typography>
              <Button variant="outlined" color="secondary" onClick={handleReset}>
              RESET TABLE
            </Button>
            </Box>
            
          </Box>
          

          {/* Amortization Schedule */}
          <Paper sx={{ borderRadius: 2, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Amortization Schedule ({currency})
            </Typography>

            {isMobile ? (
              /* Mobile: no horizontal scroll, wrap last header and cells */
              <TableContainer>
                <Table size="small" aria-label="schedule">
                  <TableHead>
                    <TableRow>
                      <TableCell>Month</TableCell>
                      <TableCell>Principal</TableCell>
                      <TableCell>Interest</TableCell>
                      <TableCell sx={{ whiteSpace: 'normal' }}>Remaining<br/>Balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {schedule.map(row => (
                      <TableRow key={row.month}>
                        <TableCell>{row.month}</TableCell>
                        <TableCell>
                          {(row.principal * (rates[currency]||1)).toFixed(2)} {currency}
                        </TableCell>
                        <TableCell>
                          {(row.interest * (rates[currency]||1)).toFixed(2)} {currency}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: 'normal' }}>
                          {(row.balance * (rates[currency]||1)).toFixed(2)} {currency}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              /* Desktop: keep horizontal scroll for wide table */
              <Box sx={{ overflowX: 'auto' }}>
                <Table size="small" sx={{ minWidth: 600 }} aria-label="schedule">
                  <TableHead>
                    <TableRow>
                      <TableCell>Month</TableCell>
                      <TableCell>Principal</TableCell>
                      <TableCell>Interest</TableCell>
                      <TableCell>Remaining Balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {schedule.map(row => (
                      <TableRow key={row.month}>
                        <TableCell>{row.month}</TableCell>
                        <TableCell>
                          {(row.principal * (rates[currency]||1)).toFixed(2)} {currency}
                        </TableCell>
                        <TableCell>
                          {(row.interest * (rates[currency]||1)).toFixed(2)} {currency}
                        </TableCell>
                        <TableCell>
                          {(row.balance * (rates[currency]||1)).toFixed(2)} {currency}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Paper>
        </Box>
      )}
    </Box>
  );
}

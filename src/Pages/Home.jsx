import React, { useState } from 'react';
import {
  Box, Grid, Typography, Button, TextField, useMediaQuery, useTheme
} from '@mui/material';
import useEmiCalculation from '../Hooks/useEmiCalculate';
import { useThemeCurrency } from '../Context/Theme currencyContextApi';
import useExchangeRates from '../Hooks/useExchangeRate';

export default function Home() {
  const [amount, setAmount] = useState('10000');
  const [rate, setRate] = useState('8.5');
  const [years, setYears] = useState('5');
  const [emi, setEmi] = useState(0);
  const { calculate, schedule } = useEmiCalculation();
  const { currency, setCurrency } = useThemeCurrency();
  const rates = useExchangeRates('USD');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCalc = () => {
    const amt = parseFloat(amount);
    const intRate = parseFloat(rate);
    const yrs = parseFloat(years);

    if (isNaN(amt) || isNaN(intRate) || isNaN(yrs)) {
      alert("Please enter valid numeric values.");
      return;
    }
    const m = calculate(amt, intRate, yrs);
    setEmi(m);
  };

  return (
    <Box sx={{ px: isMobile ? 3 : 14 }}>
      <Typography variant="h4" gutterBottom>
        Loan Calculator Dashboard
      </Typography>

      <Grid container spacing={2}>
        {[
          ['Loan Amount', amount, setAmount],
          ['Interest Rate (%)', rate, setRate],
          ['Term (Years)', years, setYears]
        ].map(([label, val, setter]) => (
          <Grid item xs={12} md={4} key={label}>
            <TextField
              fullWidth
              type="text"
              variant="outlined"
              label={label}
              value={val}
              onChange={e => setter(e.target.value)}
              placeholder={label}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'start', mt: 3 }}>
        <Button variant="contained" size="large" onClick={handleCalc}>
          CALCULATE
        </Button>
      </Box>

      {emi > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Monthly EMI: ${emi.toFixed(2)}
          </Typography>

          {/* Currency + Converted EMI + Reset button in a row */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 2,
              flexWrap: 'wrap',
              mb: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box>
                <Typography variant="body2" gutterBottom>
                  Currency
                </Typography>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    minWidth: '80px'
                  }}
                >
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                </select>
              </Box>

              <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
                Converted EMI: {(emi * (rates[currency] || 1)).toFixed(2)} {currency}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => window.location.reload()}
            >
              RESET TABLE
            </Button>
          </Box>

          {/* Scrollable Table */}
          <Box
            sx={{
              overflowX: 'auto',
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              maxWidth: '100%'
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr>
                  {['Month', 'Principal', 'Interest', 'Remaining Balance'].map((header) => (
                    <th
                      key={header}
                      style={{
                        padding: '12px',
                        borderBottom: '1px solid #ccc',
                        backgroundColor: '#f5f5f5',
                        textAlign: 'left',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.month}>
                    <td style={{ padding: '12px' }}>{row.month}</td>
                    <td style={{ padding: '12px' }}>
                      {(row.principal * (rates[currency] || 1)).toFixed(2)} {currency}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {(row.interest * (rates[currency] || 1)).toFixed(2)} {currency}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {(row.balance * (rates[currency] || 1)).toFixed(2)} {currency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      )}
    </Box>
  );
}

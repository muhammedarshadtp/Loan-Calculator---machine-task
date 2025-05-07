import React, { useState } from 'react';
import {
  Box, Grid, Typography, Button, TextField, Paper, useMediaQuery, useTheme
} from '@mui/material';
import useEmiCalculation from '../Hooks/useEmiCalculate';
import { useThemeCurrency } from '../Context/Theme currencyContextApi';
import useExchangeRates from '../Hooks/useExchangeRate';

export default function Home() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [emi, setEmi] = useState(0);
  const { calculate, schedule } = useEmiCalculation();
  const { currency } = useThemeCurrency();
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
    <Box sx={{ px: isMobile ? 2 : 4 }}>
      <Typography variant="h4" gutterBottom>
        Loan Calculator Dashboard
      </Typography>
      <Grid container spacing={2}>
        {[['Loan Amount', amount, setAmount],
          ['Interest Rate (%)', rate, setRate],
          ['Term (Years)', years, setYears]
        ].map(([label, val, setter]) => (
          <Grid item xs={12} md={4} key={label}>
              <TextField
                fullWidth
                type="text"
                value={val}
                onChange={e => setter(+e.target.value)}
                placeholder={label}
              /> 
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'start', mt: 3 }}>
        <Button variant="contained" size="large" onClick={handleCalc}>CALCULATE</Button>
      </Box>

      {emi > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Monthly EMI: ${emi.toFixed(2)} ≈ {(emi * (rates[currency] || 1)).toFixed(2)} {currency}
          </Typography>
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Month', 'Principal', 'Interest', 'Remaining Balance'].map(h => (
                    <th key={h} style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schedule.map(row => (
                  <tr key={row.month}>
                    <td style={{ padding: 8 }}>{row.month}</td>
                    <td style={{ padding: 8 }}>{row.principal.toFixed(2)}</td>
                    <td style={{ padding: 8 }}>{row.interest.toFixed(2)}</td>
                    <td style={{ padding: 8 }}>{row.balance.toFixed(2)}</td>
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

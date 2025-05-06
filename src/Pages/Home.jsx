import React, { useState } from 'react';
import { Box, Grid, Typography, Button, TextField, Paper } from '@mui/material';
import useEmiCalculation from '../Hooks/useEmiCalculate';
import { useThemeCurrency } from '../Context/Theme currencyContextApi';
import useExchangeRates from '../Hooks/useExchangeRate';


export default function Home() {
  const [amount, setAmount] = useState(0);
  const [rate, setRate]     = useState(0);
  const [years, setYears]   = useState(0);
  const { calculate, schedule } = useEmiCalculation();
  const { currency } = useThemeCurrency();
  const rates = useExchangeRates('USD');

  const [emi, setEmi] = useState(0);

  const handleCalc = () => {
    const m = calculate(amount, rate, years);
    setEmi(m);
  };

  return (
    <Box sx={{ px: 4 }}>
      <Typography variant="h4" gutterBottom>Loan Calculator Dashboard</Typography>
      <Grid container spacing={2}>
        {[['Loan Amount', amount, setAmount],
          ['Interest Rate (%)', rate, setRate],
          ['Term (Years)', years, setYears]
        ].map(([label, val, setter]) => (
          <Grid item xs={12} md={4} key={label}>
            <Paper sx={{ p: 2, border: '1px solid #ccc' }}>
              <Typography variant="subtitle1" gutterBottom>{label}</Typography>
              <TextField
                fullWidth
                placeholder={label}
                value={val}
                onChange={e => setter(+e.target.value)}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button variant="contained" onClick={handleCalc}>Calculate</Button>
      </Box>

      {emi > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">
            Monthly EMI: ${(emi).toFixed(2)} ≈ {(emi * (rates[currency]||1)).toFixed(2)} {currency}
          </Typography>
          <Box component="table" sx={{ width: '100%', mt: 2, borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Month','Principal','Interest','Balance'].map(h => (
                  <th key={h} style={{ borderBottom: '1px solid #ccc', p: 8, textAlign: 'left' }}>{h}</th>
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
          </Box>
        </Box>
      )}
    </Box>
);
}

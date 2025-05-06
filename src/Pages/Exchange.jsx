import React from 'react';
import { Box, Typography } from '@mui/material';
import useExchangeRates from '../Hooks/useExchangeRate';
import { useThemeCurrency } from '../Context/Theme currencyContextApi';


export default function ExchangeRates() {
  const rates = useExchangeRates('USD');
  const { currency } = useThemeCurrency();

  return (
    <Box sx={{ px: 4 }}>
      <Typography variant="h4" gutterBottom>Live Exchange Rates (Base USD)</Typography>
      <Typography>1 USD = {rates[currency]?.toFixed(4)} {currency}</Typography>
    </Box>
  );
}

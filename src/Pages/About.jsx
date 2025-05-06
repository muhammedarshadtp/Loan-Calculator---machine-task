import React from 'react';
import { Box, Typography, Link } from '@mui/material';

export default function About() {
  return (
    <Box sx={{ px: 4 }}>
      <Typography variant="h4" gutterBottom>About This App</Typography>
      <Typography paragraph>
        This Loan Calculator App is a modern, single-page web application built using <strong>React JS</strong> and <strong>Material UI</strong>. It allows users to calculate loan EMIs, view an amortization schedule, convert currencies, and toggle themes.
      </Typography>
      <Typography>
        API: <Link href="https://www.exchangerate-api.com/" target="_blank">ExchangeRate-API</Link>
      </Typography>
    </Box>
  );
}

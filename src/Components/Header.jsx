import React from 'react';
import { AppBar, Toolbar, Typography, Button, Switch, Box, MenuItem, Select } from '@mui/material';

import { useThemeCurrency } from '../Context/Theme currencyContextApi';
import { NavLink } from 'react-router-dom';


export default function Header() {
  const { mode, toggleMode, currency, setCurrency } = useThemeCurrency();

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Loan Calculator
        </Typography>
        <Button component={NavLink} to="/" color="inherit">Home</Button>
        <Button component={NavLink} to="/exchange" color="inherit">Exchange Rates (Live)</Button>
        <Button component={NavLink} to="/about" color="inherit">About</Button>
        <Box sx={{ mx: 2 }}>
          <Select
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            size="small"
            sx={{ color: '#fff', '.MuiSvgIcon-root': { color: '#fff' } }}
          >
            {['USD','EUR','INR','GBP'].map(c => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </Box>
        <Switch checked={mode==='dark'} onChange={toggleMode} />
      </Toolbar>
    </AppBar>
  );
}

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { useThemeCurrency } from '../Context/Theme currencyContextApi';

export default function Header() {
  const { mode, toggleMode } = useThemeCurrency();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Exchange Rates (Live)', to: '/exchange' },
    { label: 'About', to: '/about' },
    { label: 'Error page', to: '/notfound' },
  ];

  const drawerContent = (
    <Box sx={{ width: 250 }} onClick={() => setDrawerOpen(false)}>
      <List>
        {navLinks.map(({ label, to }) => (
          <ListItem button key={label} component={NavLink} to={to}>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Loan Calculator
          </Typography>

          {!isMobile && navLinks.map(({ label, to }) => (
            <Button key={label} component={NavLink} to={to} color="inherit">
              {label}
            </Button>
          ))}

          <Switch checked={mode === 'dark'} onChange={toggleMode} />
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
}

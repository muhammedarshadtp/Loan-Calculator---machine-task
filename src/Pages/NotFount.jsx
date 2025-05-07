import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 3,
        px: 2,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 400 }}>
        Something went wrong in the application.
      </Typography>

      <Button
        variant="outlined"
        component={Link}
        to="/"
        sx={{
          textTransform: 'uppercase',
          px: 4,
          py: 1.5,
          fontWeight: 500,
          borderRadius: 2,
        }}
      >
        Go Home
      </Button>
    </Box>
    
  );
}

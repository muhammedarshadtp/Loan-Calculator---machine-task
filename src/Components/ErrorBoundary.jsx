import React from 'react';
import { Typography, Box, Button } from '@mui/material';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() { return { hasError: true }; }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" color="error" gutterBottom>
            Something went wrong.
          </Typography>
          <Typography>Please refresh or try again later.</Typography>
          
        </Box>
      );
    }
    return this.props.children;
  }
}

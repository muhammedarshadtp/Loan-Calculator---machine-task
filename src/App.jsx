import React from 'react';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useThemeCurrency } from './Context/Theme currencyContextApi';
import Home from './Pages/Home';
import ExchangeRates from './Pages/Exchange';
import About from './Pages/About';
import NotFound from './Pages/NotFount';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './Components/ErrorBoundary';
import Header from './Components/Header';


export default function App() {
  const { mode } = useThemeCurrency();

  const theme = createTheme({
    palette: { mode }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exchange" element={<ExchangeRates />} />
            <Route path="/about" element={<About />} />
            <Route path="/notfound" element={<NotFound/>}></Route>
            <Route path="*" element={<ErrorBoundary />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
}

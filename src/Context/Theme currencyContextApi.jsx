import React, { createContext, useContext, useState } from 'react';

const ThemeCurrencyContext = createContext();

export function ThemeCurrencyProvider({ children }) {
  const [mode, setMode] = useState('light');
  const [currency, setCurrency] = useState('USD');

  const toggleMode = () => setMode(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeCurrencyContext.Provider value={{ mode, toggleMode, currency, setCurrency }}>
      {children}
    </ThemeCurrencyContext.Provider>
  );
}

export function useThemeCurrency() {
  return useContext(ThemeCurrencyContext);
}

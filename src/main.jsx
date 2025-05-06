import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeCurrencyProvider } from './Context/Theme currencyContextApi.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ThemeCurrencyProvider>
    <App />
  </ThemeCurrencyProvider>
  </StrictMode>,
)

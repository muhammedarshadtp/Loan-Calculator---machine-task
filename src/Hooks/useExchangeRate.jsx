// useExchangeRate.js
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useExchangeRates(base = 'USD') {
  const [rates, setRates] = useState({});
  const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;


  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`);
        setRates(res.data.conversion_rates || {});
      } catch (err) {
        console.error("Error fetching exchange rates:", err);
      }
    }
    fetchRates();
  }, [base]);

  return rates;
}

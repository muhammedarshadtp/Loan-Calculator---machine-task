import axios from 'axios';
import { useState, useEffect } from 'react';


export default function useExchangeRates(base = 'USD') {
  const [rates, setRates] = useState({});

  useEffect(() => {
    async function fetchRates() {
      const res = await axios.get(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${base}`);
      setRates(res.data.conversion_rates || {});
    }
    fetchRates();
  }, [base]);

  return rates;
}

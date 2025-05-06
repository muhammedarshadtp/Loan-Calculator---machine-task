import { useState } from 'react';

export default function useEmiCalculation() {
  const [schedule, setSchedule] = useState([]);

  function calculate(principal, annualRate, years) {
    const r = annualRate / 100 / 12;
    const n = years * 12;
    const x = Math.pow(1 + r, n);
    const emi = (principal * x * r) / (x - 1);

    let balance = principal;
    const amort = [];

    for (let m = 1; m <= n; m++) {
      const interest = balance * r;
      const principalPaid = emi - interest;
      balance -= principalPaid;
      amort.push({ month: m, principal: principalPaid, interest, balance });
    }
    setSchedule(amort);
    return emi;
  }

  return { schedule, calculate };
}

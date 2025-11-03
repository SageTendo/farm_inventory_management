import { useEffect, useState } from "react";

type CurrencyType = "USD" | "ZIG";

export function useCurrency() {
  // TODO: Make global states
  const [exchangeRate, _setExchangeRate] = useState(20);
  const [selectedCurrency, _setCurrency] = useState<CurrencyType>("USD");

  useEffect(() => {
    // TODO: Get exchange rate from backend
    console.log("Updating exchange rate in backend");
  }, [exchangeRate]);

  function setExchangeRate(rate: number) {
    // TODO: update in backend
    _setExchangeRate(rate);
  }

  function setCurrency(currency: CurrencyType) {
    _setCurrency(currency);
  }

  return {
    exchangeRate,
    selectedCurrency,
    setCurrency,
    setExchangeRate,
  };
}

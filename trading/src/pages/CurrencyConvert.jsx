"use client";

import { useState } from "react";
import axios from "axios";

const SUPPORTED_CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "INR",
  "JPY",
  "CAD",
  "AUD",
  "CHF",
  "CNY",
  "SGD",
  "HKD",
  "NZD",
  "SEK",
  "KRW",
  "NOK",
  "MXN",
  "BRL",
  "ZAR",
  "RUB",
  "TRY",
];

const CURRENCY_SYMBOLS = {
  USD: "💵",
  EUR: "💶",
  GBP: "💷",
  INR: "₹",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
  CHF: "₣",
  CNY: "¥",
  SGD: "S$",
  HKD: "HK$",
  NZD: "NZ$",
  SEK: "kr",
  KRW: "₩",
  NOK: "kr",
  MXN: "Mex$",
  BRL: "R$",
  ZAR: "R",
  RUB: "₽",
  TRY: "₺",
};

function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConvert = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/currency/convert`,
        {
          params: {
            from: fromCurrency,
            to: toCurrency,
            amount: amount,
          },
        }
      );

      if (response.data.success) {
        setResult({
          rate: response.data.rate,
          convertedAmount: response.data.convertedAmount,
        });
      } else {
        setError(
          response.data.message || "An error occurred during conversion."
        );
      }
    } catch (error) {
      setError("Failed to fetch conversion data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)]">
      <div className="currency-converter dark:bg-[#142028] bg-[#F4F5F6] border dark:border-[#2c2d31] rounded-2xl p-4 max-w-[400px] w-full">
        <h1 className="dark:text-white text-black font-semibold text-center text-xl mb-8">
          Currency Converter
        </h1>
        <div className="converter-form">
          <div className="flex gap-4">
            <div className="w-full">
              <label
                htmlFor="fromCurrency"
                className="dark:text-[#818EA3] font-semibold mb-1 block"
              >
                From:
              </label>
              <select
                id="fromCurrency"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="outline-none text-base text-gray-700 dark:bg-[#23323C] dark:text-white shadow-lg bg-white rounded-lg w-full h-9 px-2"
              >
                {SUPPORTED_CURRENCIES.map((currency) => (
                  <option key={currency} value={currency}>
                    {`${currency} (${CURRENCY_SYMBOLS[currency] || ""})`}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="toCurrency"
                className="dark:text-[#818EA3] font-semibold mb-1 block"
              >
                To:
              </label>
              <select
                id="toCurrency"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="outline-none text-base text-gray-700 dark:bg-[#23323C] dark:text-white shadow-lg bg-white rounded-lg w-full h-9 px-2"
              >
                {SUPPORTED_CURRENCIES.map((currency) => (
                  <option key={currency} value={currency}>
                    {`${CURRENCY_SYMBOLS[currency] || ""} ${currency}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group mt-4">
            <label
              htmlFor="amount"
              className="dark:text-[#818EA3] font-semibold mb-1 block"
            >
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="outline-none text-base text-gray-700 dark:bg-[#23323C] dark:text-white shadow-lg bg-white rounded-lg w-full h-9 px-2 remove-arrow"
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleConvert}
              disabled={isLoading || !amount || !fromCurrency || !toCurrency}
              className="bg-[#3898ff] text-white rounded-lg px-3 py-2 font-semibold tracking-wider disabled:bg-[#8cc4ff]"
            >
              {isLoading ? "Converting..." : "Convert"}
            </button>
          </div>
          <div className="mt-3">
            <label className="dark:text-[#818EA3] font-semibold mb-1 block">
              Covnverted Amount
            </label>
            <input
              type="text"
              value={result ? result.convertedAmount.toFixed(2) : ""}
              disabled
              className="outline-none text-base text-gray-700 dark:bg-[#23323C] dark:text-white shadow-lg bg-white rounded-lg w-full h-9 px-2"
            />
          </div>
        </div>
        {error && <p className="text-[red] mt-2 text-center">{error}</p>}
        {result && (
          <div className="mt-4">
            <p className="dark:text-[#8e8989] text-black">
              {amount} {fromCurrency} = {result.convertedAmount.toFixed(2)}{" "}
              {toCurrency}
            </p>
            <p className="dark:text-[#8e8989] text-black mt-1">
              Exchange rate: 1 {fromCurrency} = {result.rate.toFixed(4)}{" "}
              {toCurrency}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrencyConverter;

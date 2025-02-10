/**
 * Currency Conversion Service
 * 
 * This module provides a service for converting currency values using the ExchangeRate API.
 * It retrieves the exchange rate between two currencies and calculates the converted amount.
 * 
 * Functions:
 * 
 * 1. convertCurrency(from, to, amount)
 *    - Converts a given amount from one currency to another.
 *    - Validates currency codes before making the API request.
 *    - Logs API call failures for debugging and monitoring.
 *    - Ensures the amount is a valid number before proceeding.
 *    - Retrieves exchange rate data from the ExchangeRate API.
 *    - Returns an object containing the conversion rate and converted amount.
 */

const fetch = require('node-fetch');

const API_KEY = process.env.CurrencyExchangeApiKey;
const BASE_URL = process.env.CurrencyExchangeBaseUrl;

// List of supported currency codes (ISO 4217 standard)
const SUPPORTED_CURRENCIES = [
    "USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD", "CHF", "CNY", "SGD", "HKD", "NZD", "SEK", "KRW", "NOK", "MXN", "BRL", "ZAR", "RUB", "TRY"
];

exports.convertCurrency = async (from, to, amount) => {
    try {
        console.log("Fetching exchange rate...");

        // Validate currency codes
        if (!SUPPORTED_CURRENCIES.includes(from) || !SUPPORTED_CURRENCIES.includes(to)) {
            console.error(`Invalid currency code: from=${from}, to=${to}`);
            return { success: false, message: "Invalid currency code. Please use a valid ISO 4217 currency code." };
        }

        // Validate amount
        if (isNaN(amount) || amount <= 0) {
            console.error(`Invalid amount: ${amount}`);
            return { success: false, message: "Invalid amount. Please enter a positive number." };
        }

        const url = `${BASE_URL}/${API_KEY}/pair/${from}/${to}/${amount}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === "success") {
            return {
                success: true,
                rate: data.conversion_rate,
                convertedAmount: data.conversion_result
            };
        } else {
            console.error(`API error: ${data["error-type"] || 'Unknown error'}`);
            return { success: false, message: data["error-type"] || "Invalid API response" };
        }
    } catch (error) {
        console.error("API call failed:", error.message);
        return { success: false, message: error.message };
    }
};

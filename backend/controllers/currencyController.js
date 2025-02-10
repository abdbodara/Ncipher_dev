const CurrencyService = require('../services/currencyService');

exports.convertCurrency = async (req, res) => {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
        return res.status(400).json({ success: false, message: 'Missing required query parameters' });
    }

    try {
        const result = await CurrencyService.convertCurrency(from, to, amount);
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(result);
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

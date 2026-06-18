const axios = require('axios'); // Menggunakan require (CommonJS)

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method tidak diizinkan' });
    }
    
    const { paymentId, txid } = req.body;
    const PI_API_KEY = process.env.PI_API_KEY;

    try {
        // Menyelesaikan transaksi di Blockchain Pi
        const response = await axios.post(
            `https://api.minepi.com/v2/payments/${paymentId}/complete`,
            { txid: txid },
            {
                headers: { 
                    'Authorization': `Key ${PI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return res.status(200).json(response.data);
    } catch (error) {
        console.error("Eror Completion:", error.response ? error.response.data : error.message);
        return res.status(500).json({ error: error.message });
    }
};

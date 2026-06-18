module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method tidak diizinkan' });
    }
    
    const { paymentId, txid } = req.body;
    const PI_API_KEY = process.env.PI_API_KEY;

    if (!paymentId || !txid) {
        return res.status(400).json({ error: 'Missing paymentId or txid' });
    }

    try {
        // Hit ke server Pi Network v2 untuk menyelesaikan siklus blockchain
        const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
            method: 'POST',
            headers: { 
                'Authorization': `Key ${PI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ txid: txid })
        });
        
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Completion Crash:", error);
        return res.status(500).json({ error: error.message });
    }
};

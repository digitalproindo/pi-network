module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { paymentId, txid } = req.body;
    const PI_API_KEY = process.env.PI_API_KEY;

    if (!paymentId || !txid) {
        return res.status(400).json({ error: 'paymentId and txid are required' });
    }

    try {
        // 2. Kirim penyelesaian TXID blockchain ke Server Pi Network
        const piResponse = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
            method: 'POST',
            headers: {
                'Authorization': `Key ${PI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ txid: txid })
        });

        const piData = await piResponse.json();
        
        // 3. Kembalikan status sukses ke Frontend
        return res.status(200).json(piData);
    } catch (error) {
        console.error("Error pada Completion:", error);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

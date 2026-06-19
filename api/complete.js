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
        return res.status(400).json({ error: 'Missing paymentId or txid' });
    }

    try {
        // 3. Mengirimkan TXID transaksi blockchain ke server Pi untuk menyelesaikan pembayaran
        const piResponse = await fetch(`https://api.tesnet.minepi.com/v2/payments/${paymentId}/complete`, {
            method: 'POST',
            headers: {
                'Authorization': `Key ${PI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ txid: txid })
        });

        const piData = await piResponse.json();
        return res.status(200).json(piData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

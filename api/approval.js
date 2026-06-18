module.exports = async function handler(req, res) {
    // 1. Atur Header CORS agar Pi Browser tidak memblokir endpoint
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { paymentId } = req.body;
    const PI_API_KEY = process.env.PI_API_KEY;

    if (!paymentId) {
        return res.status(400).json({ error: 'paymentId is required' });
    }

    try {
        // 2. Kirim persetujuan ke Server Pi Network
        const piResponse = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
            method: 'POST',
            headers: {
                'Authorization': `Key ${PI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const piData = await piResponse.json();

        // 3. Kembalikan data murni dari Pi Server langsung ke Frontend Anda
        return res.status(200).json(piData);
    } catch (error) {
        console.error("Error pada Approval:", error);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

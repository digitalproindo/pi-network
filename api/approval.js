module.exports = async function handler(req, res) {
    // Mengizinkan CORS agar browser tidak memblokir transaksi
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method tidak diizinkan' });
    }
    
    const { paymentId } = req.body;
    const PI_API_KEY = process.env.PI_API_KEY; 

    if (!paymentId) {
        return res.status(400).json({ error: 'Missing paymentId' });
    }

    try {
        // Hit ke server Pi Network v2 untuk menyetujui pembayaran
        const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
            method: 'POST',
            headers: { 
                'Authorization': `Key ${PI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        console.log("Pi Server Response:", data);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Approval Crash:", error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { paymentId } = req.body;
    const PI_API_KEY = process.env.PI_API_KEY;

    if (!paymentId) return res.status(400).json({ error: 'paymentId is required' });

    try {
        // PERBAIKAN UTAMA: Server Pi v2 membutuhkan POST kosong atau payload valid untuk verifikasi approval
        const piResponse = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
            method: 'POST',
            headers: {
                'Authorization': `Key ${PI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}) // Menyertakan objek kosong agar request POST tervalidasi sempurna
        });

        const piData = await piResponse.json();
        return res.status(200).json(piData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

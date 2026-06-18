module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { paymentId } = req.body;
    const PI_API_KEY = process.env.PI_API_KEY;

    try {
        const piResponse = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
            method: 'POST',
            headers: { 'Authorization': `Key ${PI_API_KEY}` }
        });

        const piData = await piResponse.json();
        return res.status(200).json(piData); // Wajib mengirimkan object response dari server Pi kembali ke frontend!
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

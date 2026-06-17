export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Metode tidak diizinkan' });
    }

    try {
        const { paymentId, txid } = req.body;
        if (!paymentId || !txid) {
            return res.status(400).json({ error: 'Payment ID atau TXID tidak lengkap' });
        }

        // ⚠️ MASUKKAN SERVER API KEY DARI DEVELOP.PI ANDA DI SINI
        const PI_API_KEY = "7dhf4pgvicd3fjhjytlgjfj6connngc2ie5q6fc3utceubmrojatqxhqt06vbzxw";

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
        console.error("Error Complete:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

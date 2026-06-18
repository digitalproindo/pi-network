export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Metode tidak diizinkan' });

    try {
        const { paymentId } = req.body;
        // 🔑 SERVER API KEY MILIK ANDA
        const PI_API_KEY = "7dhf4pgvicd3fjhjytlgjfj6connngc2ie5q6fc3utceubmrojatqxhqt06vbzxw"; 

        const piResponse = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
            method: 'POST',
            headers: {
                'Authorization': `Key ${PI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const responseText = await piResponse.text();
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            return res.status(500).json({ error: "Format respon tidak valid", raw: responseText });
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

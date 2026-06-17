export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Metode tidak diizinkan' });
    }

    try {
        const { paymentId, txid } = req.body;
        if (!paymentId || !txid) {
            return res.status(400).json({ error: 'Payment ID dan TXID wajib diisi' });
        }

        // ⚠️ MASUKKAN SERVER API KEY DARI DEVELOP.PI DI SINI
        const PI_API_KEY = "7dhf4pgvicd3fjhjytlgjfj6connngc2ie5q6fc3utceubmrojatqxhqt06vbzxw"; 

        // Beritahu Pi Network bahwa transaksi telah selesai sepenuhnya di sisi merchant
        const piResponse = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
            method: 'POST',
            headers: {
                'Authorization': `Key ${PI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ txid: txid })
        });

        const data = await piResponse.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error("Error di complete:", error);
        return res.status(500).json({ error: 'Gagal memproses penyelesaian ke Pi Server' });
    }
}

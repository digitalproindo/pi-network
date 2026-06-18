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
            return res.status(400).json({ error: 'Data transaksi tidak lengkap' });
        }

        // ⚠️ PASTIKAN KUNCI DI BAWAH INI ADALAH SERVER API KEY DARI DEVELOP.PI
        const PI_API_KEY = "7dhf4pgvicd3fjhjytlgjfj6connngc2ie5q6fc3utceubmrojatqxhqt06vbzxw"; 

        console.log(`Mencoba Menyelesaikan ID: ${paymentId} dengan TXID: ${txid}`);

        const piResponse = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
            method: 'POST',
            headers: {
                'Authorization': `Key ${PI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ txid: txid })
        });

        const responseText = await piResponse.text();
        let data JSON;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            return res.status(500).json({ error: "Gagal membaca format data", raw: responseText });
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error("Eror fatal pada sistem completion:", error);
        return res.status(500).json({ error: error.message });
    }
}

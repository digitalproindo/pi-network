export default async function handler(req, res) {
    // Amankan pengaturan akses lintas domain (CORS)
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
        const { paymentId } = req.body;
        if (!paymentId) {
            return res.status(400).json({ error: 'Payment ID kosong' });
        }

        // ⚠️ PASTIKAN KUNCI DI BAWAH INI ADALAH SERVER API KEY DARI DEVELOP.PI
        const PI_API_KEY = "7dhf4pgvicd3fjhjytlgjfj6connngc2ie5q6fc3utceubmrojatqxhqt06vbzxw"; 

        console.log(`Mencoba Approve ID Transaksi: ${paymentId}`);

        const piResponse = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
            method: 'POST',
            headers: {
                'Authorization': `Key ${PI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Ambil teks asli dari server Pi sebelum dikonversi ke JSON agar tidak crash
        const responseText = await piResponse.text();
        console.log("Respon mentah dari Server Pi:", responseText);

        let data JSON;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            return res.status(500).json({ error: "Gagal membaca format respon Pi", raw: responseText });
        }

        // Kirim persetujuan balik ke HP Pembeli
        return res.status(200).json(data);

    } catch (error) {
        console.error("Eror fatal pada sistem approval:", error);
        return res.status(500).json({ error: error.message });
    }
}

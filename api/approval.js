module.exports = async function handler(req, res) {
    // 1. CORS Headers yang aman untuk semua lingkungan Pi Browser
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // 2. Antisipasi parsing data body jika dikirim sebagai string JSON biasa
    let body = req.body;
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body);
        } catch (e) {
            console.error("Gagal parse JSON body:", e);
        }
    }

    const paymentId = body?.paymentId;
    const PI_API_KEY = process.env.PI_API_KEY;

    if (!paymentId) {
        return res.status(400).json({ error: 'paymentId is required atau format salah' });
    }

    try {
        // 3. Menembak ke server TESTNET karena Anda masih menggunakan Koin Uji Coba di pinet.com
        const piResponse = await fetch(`https://api.testnet.minepi.com/v2/payments/${paymentId}/approve`, {
            method: 'POST',
            headers: {
                'Authorization': `Key ${PI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}) 
        });

        const piData = await piResponse.json();

        if (!piResponse.ok) {
            console.error("Error dari Server Pi:", piData);
            return res.status(piResponse.status).json({ 
                error: "Gagal menyetujui transaksi di server Pi", 
                detail: piData 
            });
        }

        return res.status(200).json(piData);

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ error: error.message });
    }
};

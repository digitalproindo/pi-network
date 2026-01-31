// api/complete.js
export default async function handler(req, res) {
    // 1. Validasi Method: Hanya menerima POST dari SDK
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { paymentId, txid } = req.body;

    // 2. Validasi input: Membutuhkan Payment ID dan Transaction ID (TXID)
    if (!paymentId || !txid) {
        return res.status(400).json({ error: "Missing Payment ID or TXID" });
    }

    try {
        console.log(`Menyelesaikan transaksi: ${paymentId} dengan TXID: ${txid}`);

        // 3. Memanggil API Pi Network untuk 'complete'
        const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
            method: 'POST',
            headers: {
                'Authorization': `Key ${process.env.PI_API_KEY}`, // Menggunakan Secret Key yang sama
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ txid }) // Mengirimkan bukti TXID dari blockchain
        });

        const data = await response.json();

        if (response.ok) {
            // Berhasil! Saldo user sekarang resmi berpindah ke dompet Anda
            console.log("Transaksi Berhasil Diselesaikan!");
            return res.status(200).json(data);
        } else {
            console.error("Gagal Complete dari API Pi:", data);
            return res.status(response.status).json(data);
        }

    } catch (error) {
        console.error("Server Error saat Completion:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
// api/approve.js
export default async function handler(req, res) {
    // 1. Validasi Method: Hanya menerima POST dari SDK
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { paymentId } = req.body;

    // 2. Validasi input paymentId
    if (!paymentId) {
        return res.status(400).json({ error: "Payment ID is required" });
    }

    try {
        console.log(`Menyetujui pembayaran: ${paymentId}`);

        // 3. Memanggil API Pi Network untuk 'approve'
        const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
            method: 'POST',
            headers: {
                'Authorization': `Key ${process.env.PI_API_KEY}`, // Pastikan Secret Key sudah benar di Vercel
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            // Berikan respons sukses ke SDK agar user bisa lanjut membayar di dompet
            return res.status(200).json(data);
        } else {
            console.error("Gagal Approve dari API Pi:", data);
            return res.status(response.status).json(data);
        }

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
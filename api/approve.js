// api/approve.js
export default async function handler(req, res) {
    // 1. Validasi Method
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { paymentId } = req.body;

    // 2. Validasi Input
    if (!paymentId) {
        return res.status(400).json({ error: "Payment ID wajib diisi" });
    }

    // Cek apakah API Key tersedia di environment
    if (!process.env.PI_API_KEY) {
        console.error("ERROR: PI_API_KEY tidak ditemukan di Vercel Settings!");
        return res.status(500).json({ error: "Konfigurasi server tidak lengkap" });
    }

    try {
        console.log(`Mencoba menyetujui pembayaran di Server Pi: ${paymentId}`);

        // 3. Memanggil API Pi Network untuk 'approve'
        const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
            method: 'POST',
            headers: {
                // Pastikan menggunakan awalan 'Key ' sebelum Secret Key
                'Authorization': `Key ${process.env.PI_API_KEY.trim()}`, 
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Approval Berhasil!");
            // Mengembalikan status 200 agar SDK membuka jendela dompet
            return res.status(200).json(data);
        } else {
            // Jika Pi API menolak, log detailnya agar bisa diperbaiki
            console.error("Ditolak oleh Pi API:", data);
            return res.status(response.status).json({ 
                error: "Ditolak oleh Pi Network", 
                details: data 
            });
        }

    } catch (error) {
        console.error("Kesalahan koneksi ke Server Pi:", error.message);
        return res.status(500).json({ error: "Gagal terhubung ke server Pi Network" });
    }
}
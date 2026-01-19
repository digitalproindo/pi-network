export default async function handler(req, res) {
  // Mengatur header CORS agar bisa diakses oleh frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'POST') {
    const { paymentId } = req.body;
    
    // Memberikan respon sukses ke Server Pi agar Dompet terbuka
    return res.status(200).json({
      message: "Payment approved",
      paymentId: paymentId,
      approved: true
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
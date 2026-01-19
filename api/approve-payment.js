export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { paymentId } = req.body;
    
    // Memberikan respon sukses ke frontend agar transaksi berlanjut
    return res.status(200).json({
      message: "Payment approved",
      paymentId: paymentId,
      approved: true
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
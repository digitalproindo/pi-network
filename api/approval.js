module.exports = async function handler(req, res) {
    // 1. Mengizinkan Pi Browser/App Studio mengakses backend Anda tanpa diblokir (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { paymentId } = req.body;
    const PI_API_KEY = process.env.PI_API_KEY;

    if (!paymentId) {
        return res.status(400).json({ error: 'paymentId is required' });
    }

      try {
    // 2. Mengirimkan sinyal persetujuan resmi ke server Pi Network Core Team
    const piResponse = await fetch(`https://api.tesnet.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${PI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
    });

    const piData = await piResponse.json();

    // PERBAIKAN: Periksa apakah respons dari server Pi benar-benar sukses (status 200-299)
    if (!piResponse.ok) {
      console.error("Error dari Server Pi:", piData);
      return res.status(piResponse.status).json({ 
        error: "Gagal menyetujui transaksi di server Pi", 
        detail: piData 
      });
    }

    // Jika benar-benar sukses, baru kembalikan status 200 ke frontend
    return res.status(200).json(piData);

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

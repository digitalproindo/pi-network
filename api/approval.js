module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method tidak diizinkan'
    });
  }

  const PI_API_KEY = process.env.PI_API_KEY;

  if (!PI_API_KEY) {
    return res.status(500).json({
      error: 'PI_API_KEY tidak ditemukan'
    });
  }

  const { paymentId } = req.body;

  if (!paymentId) {
    return res.status(400).json({
      error: 'paymentId wajib diisi'
    });
  }

  try {
    console.log('APPROVE PAYMENT:', paymentId);

    const response = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {
        method: 'POST',
        headers: {
          Authorization: `Key ${PI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const data = await response.json();

    console.log('PI APPROVE RESPONSE:', data);

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: err.message
    });
  }
};

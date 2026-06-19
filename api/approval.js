// api/approval.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    
    const { paymentId } = req.body;
    const apiKey = process.env.PI_API_KEY; // Membaca Server API Key dari environment variable

    try {
        const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
            method: 'POST',
            headers: {
                'Authorization': `Key ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return res.status(200).json({ message: 'Payment approved successfully' });
        } else {
            const errData = await response.json();
            return res.status(response.status).json(errData);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

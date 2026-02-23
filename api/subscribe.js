export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = parseInt(process.env.BREVO_LIST_ID || '2', 10);

    if (!apiKey) {
        console.error('BREVO_API_KEY is not set');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify({
                email: email,
                listIds: [listId],
                updateEnabled: true
            })
        });

        if (brevoResponse.ok || brevoResponse.status === 204) {
            return res.status(200).json({ success: true });
        } else {
            const errorData = await brevoResponse.json();
            console.error('Brevo API Error:', errorData);
            return res.status(brevoResponse.status).json(errorData);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Handle the authorization callback from HubSpot
    if (req.query.code) {
      try {
        // Exchange the authorization code for an access token
        const clientId = '94a8188f-5484-474f-b8a4-5eb80fc5d5db';
        const clientSecret = 'c7f173fa-411e-480a-b5e9-d90a0c01a385';
        let SCOPES = ['crm.objects.contacts.read'];
        const PORT = 3000;

        // On successful install, users will be redirected to /oauth-callback
        const redirectUri = `http://localhost:${PORT}/api/authorization`;

        const tokenUrl = 'https://api.hubapi.com/oauth/v1/token';
        const response = await axios.post(tokenUrl, {
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          code: req.query.code
        });

        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;

        // Handle the authorization process here
        // ...

        res.status(200).json({ message: 'Authorization successful' });
      } catch (error) {
        console.error('Error exchanging authorization code for access token:', error);
        res.status(500).json({ message: 'Failed to exchange authorization code' });
      }
    } else {
      res.status(400).json({ message: 'Invalid request' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}


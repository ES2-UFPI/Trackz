const axios = require('axios');
require('dotenv').config();

let accessToken = null;

async function getAccessToken() {
  if (accessToken) return accessToken;

  const auth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');

  const res = await axios.post(
    process.env.SPOTIFY_TOKEN_URL,
    'grant_type=client_credentials',
    {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  accessToken = res.data.access_token;
  setTimeout(() => (accessToken = null), res.data.expires_in * 1000);
  return accessToken;
}

async function searchTracks(query) {
  const token = await getAccessToken();

  const res = await axios.get(`${process.env.SPOTIFY_API_URL}/search`, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      q: query,
      type: 'track',
      limit: 10
    }
  });

  return res.data.tracks.items.map(track => ({
    id: track.id,
    name: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    album: track.album.name,
    imageUrl: track.album.images?.[0]?.url,
    previewUrl: track.preview_url
  }));
}

module.exports = { searchTracks };

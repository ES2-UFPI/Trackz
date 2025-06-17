const express = require('express');
const router = express.Router();
const { searchTracks } = require('../services/spotifyService');

router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'Query param "q" is required' });

    const results = await searchTracks(query);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar músicas' });
  }
});

module.exports = router;

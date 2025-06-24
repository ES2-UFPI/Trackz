const express = require('express');
const router = express.Router();
const {
  searchTracks,
  getTrackById,
  getAlbumById,
  getArtistById,
  getArtistTopTracks
} = require('../services/spotifyService');

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


//Buscar faixa 
router.get('/track/:id', async (req, res) => {
  try {
    const data = await getTrackById(req.params.id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar faixa' });
  }
});

//Buscar álbum
router.get('/album/:id', async (req, res) => {
  try {
    const data = await getAlbumById(req.params.id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar álbum' });
  }
});

//Buscar artista
router.get('/artist/:id', async (req, res) => {
  try {
    const data = await getArtistById(req.params.id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar artista' });
  }
});

// Top músicas de um artista
router.get('/artist/:id/top-tracks', async (req, res) => {
  try {
    const data = await getArtistTopTracks(req.params.id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar top tracks do artista' });
  }
});
module.exports = router;

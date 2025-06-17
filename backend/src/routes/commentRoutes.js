const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
  createComment,
  getCommentsByMusicId
} = require('../services/commentService');

// 🟢 Protegida com autenticação JWT
router.post('/', verifyToken, async (req, res) => {
  const { musicId, content, musicData } = req.body;

  if (!musicId || !content || !musicData) {
    return res.status(400).json({ error: 'Campos obrigatórios: musicId, content, musicData' });
  }

  try {
    // pega userId do token JWT decodificado
    const userId = req.user.userId;

    const comment = await createComment({ musicId, content, userId, musicData });
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar comentário' });
  }
});

// 🔓 Rota pública: buscar comentários por música
router.get('/:musicId', async (req, res) => {
  try {
    const comments = await getCommentsByMusicId(req.params.musicId);
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar comentários' });
  }
});

module.exports = router;

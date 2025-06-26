const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { getUserById, updateUser } = require('../services/userService');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const user = await getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(user);
});

router.put('/:id', verifyToken, async (req, res) => {
  if (req.user.userId !== req.params.id) {
    return res.status(403).json({ error: 'Acesso negado' });
  }
  const { bio, avatarUrl } = req.body;
  const updated = await updateUser(req.params.id, { bio, avatarUrl });
  res.json(updated);
});

module.exports = router;

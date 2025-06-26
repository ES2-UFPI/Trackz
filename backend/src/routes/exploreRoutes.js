const express = require('express');
const router = express.Router();
const { getPopularPosts, getRecentPosts, getTopUsers } = require('../services/exploreService');

router.get('/popular', async (req, res) => {
  res.json(await getPopularPosts());
});
router.get('/recent', async (req, res) => {
  res.json(await getRecentPosts());
});
router.get('/top-users', async (req, res) => {
  res.json(await getTopUsers());
});

module.exports = router;

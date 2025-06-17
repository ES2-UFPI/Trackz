const express = require('express');
const cors = require('cors');
const spotifyRoutes = require('./routes/spotifyRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/spotify', spotifyRoutes);

// Rota raiz (opcional para teste rápido)
app.get('/', (req, res) => {
  res.send('🎵 TrackZ Backend rodando!');
});

// Rota para os comentários
const commentRoutes = require('./routes/commentRoutes');
app.use('/comments', commentRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
module.exports = app;

const express = require('express');
const cors = require('cors');
const spotifyRoutes = require('./routes/spotifyRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

//Rota para o usuario
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);


//Rota pra explorar
const exploreRoutes = require('./routes/exploreRoutes');
app.use('/explore', exploreRoutes);

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

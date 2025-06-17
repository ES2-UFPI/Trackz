const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getCommentsByMusicId(musicId) {
  return prisma.comment.findMany({
    where: { musicId },
    include: {
      user: {
        select: { name: true } // retorna apenas o nome do usuário
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

async function createComment({ musicId, content, userId, musicData }) {
  // Verifica se a música já existe
  let music = await prisma.music.findUnique({
    where: { id: musicId }
  });

  // Se não existir, cria a música com base no que veio da API
  if (!music) {
    music = await prisma.music.create({
      data: {
        id: musicId,
        name: musicData.name,
        artist: musicData.artist,
        album: musicData.album,
        imageUrl: musicData.imageUrl,
        previewUrl: musicData.previewUrl
      }
    });
  }

  // Cria o comentário associado ao usuário e à música
  const comment = await prisma.comment.create({
    data: {
      content,
      userId,
      musicId
    }
  });

  return comment;
}

module.exports = {
  createComment,
  getCommentsByMusicId
};


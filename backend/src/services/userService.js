const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true, name: true, bio: true, avatarUrl: true,
      _count: { select: { posts: true, comments: true } }
    }
  });
}

async function updateUser(id, data) {
  return prisma.user.update({
    where: { id },
    data
  });
}

module.exports = { getUserById, updateUser };

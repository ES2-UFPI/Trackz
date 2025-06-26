const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getPopularPosts(limit = 10) {
  return prisma.post.findMany({
    orderBy: { likes: 'desc' },
    take: limit,
    include: { user: { select: { name: true, avatarUrl: true } } }
  });
}

async function getRecentPosts(limit = 10) {
  return prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: { user: { select: { name: true, avatarUrl: true } } }
  });
}

async function getTopUsers(limit = 10) {
  return prisma.user.findMany({
    orderBy: {
      posts: { _count: 'desc' }
    },
    take: limit,
    select: {
      id: true,
      name: true,
      avatarUrl: true,
      _count: { select: { posts: true } }
    }
  });
}

module.exports = { getPopularPosts, getRecentPosts, getTopUsers };

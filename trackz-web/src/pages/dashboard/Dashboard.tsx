import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PostItem from '../../components/PostItem/PostItem';
import PostItemSkeleton from '../../components/PostItemSkeleton/PostItemSkeleton'; // 1. IMPORTE O SKELETON
import styles from './Dashboard.module.css';
import { IPost, IComment } from '../../types'; // Importa do arquivo central

// Dados mockados completos
const mockFeedPosts: IPost[] = [
  {
    id: 'p1',
    user: { name: 'Antonio Anderson', username: 'and21', avatarUrl: '/images/default-avatar.png' },
    post: { text: 'Este álbum é uma obra-prima! A produção é incrível e as melodias são contagiantes. Não consigo parar de ouvir.', timestamp: '2h atrás' },
    album: { id: '2', name: 'Un Verano Sin Ti', artist: 'Bad Bunny', imageUrl: '/images/un-verano-sin-ti.jpg' },
    likesCount: 15,
    isLiked: false,
    comments: [
      { id: 'c1', user: { username: 'gabLCS', avatarUrl: '/images/default-avatar.png' }, text: 'Concordo totalmente! A melhor do álbum.' },
      { id: 'c2', user: { username: 'marcosv', avatarUrl: '/images/default-avatar.png' }, text: 'Clássico instantâneo.' },
    ],
  },
  {
    id: 'p2',
    user: { name: 'Gabriel Leonardo', username: 'gabLCS', avatarUrl: '/images/default-avatar.png' },
    post: { text: 'Uma viagem nostálgica. Me lembra os verões da minha adolescência. Recomendo demais!', timestamp: '5h atrás' },
    album: { id: '5', name: 'Debí Tirar Más Fotos', artist: 'Bad Bunny', imageUrl: '/images/debi-tirar-mas-fotos.jpg' },
    likesCount: 32,
    isLiked: true,
    comments: [],
  },
];

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula o carregamento dos posts do feed
    setTimeout(() => {
      setPosts(mockFeedPosts);
      setIsLoading(false);
    }, 2000); // Aumentado para 2s para ver melhor o skeleton
  }, []);

  const handleLike = (postId: string) => {
    const newPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
        };
      }
      return post;
    });
    setPosts(newPosts);
  };

  const handleCommentSubmit = (postId: string, commentText: string) => {
    const newPosts = posts.map(post => {
      if (post.id === postId) {
        const newComment: IComment = {
          id: `c${Date.now()}`,
          user: { username: 'and21', avatarUrl: '/images/default-avatar.png' },
          text: commentText,
        };
        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      }
      return post;
    });
    setPosts(newPosts);
  };

  return (
    <div className={styles.dashboardLayout}>
      <Navbar />
      <main className={styles.dashboardMainContent}>
        <h1 className={styles.pageTitle}>Seu Feed</h1>

        <div className={styles.feedContainer}>
          {isLoading ? (
            // 2. RENDERIZA OS SKELETONS EM VEZ DO TEXTO "CARREGANDO"
            <>
              <PostItemSkeleton />
              <PostItemSkeleton />
              <PostItemSkeleton />
            </>
          ) : (
            posts.map(post => (
              <PostItem
                key={post.id}
                postData={post}
                onLike={handleLike}
                onCommentSubmit={handleCommentSubmit}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
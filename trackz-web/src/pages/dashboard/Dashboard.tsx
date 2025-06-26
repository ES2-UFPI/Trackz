import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PostItem from '../../components/PostItem/PostItem'; // 1. ADICIONE ESTA LINHA DE IMPORTAÇÃO
import styles from './Dashboard.module.css'; // Renomeei de 'dashStyles' para 'styles' para consistência

// Definindo a interface para um post, para garantir a consistência dos dados
interface IPost {
  id: string;
  user: {
    name: string;
    username: string;
    avatarUrl: string;
  };
  post: {
    text: string;
    timestamp: string;
  };
  album: {
    id: string;
    name: string;
    artist: string;
    imageUrl: string;
  };
}

// Criando os dados mockados
const mockFeedPosts: IPost[] = [
  {
    id: 'p1',
    user: { name: 'Antonio Anderson', username: 'and21', avatarUrl: '/images/default-avatar.png' },
    post: { text: 'Este álbum é uma obra-prima! A produção é incrível e as melodias são contagiantes. Não consigo parar de ouvir.', timestamp: '2h atrás' },
    album: { id: '2', name: 'Un Verano Sin Ti', artist: 'Bad Bunny', imageUrl: '/images/un-verano-sin-ti.jpg' }
  },
  {
    id: 'p2',
    user: { name: 'Gabriel Leonardo', username: 'gabLCS', avatarUrl: '/images/default-avatar.png' },
    post: { text: 'Uma viagem nostálgica. Me lembra os verões da minha adolescência. Recomendo demais!', timestamp: '5h atrás' },
    album: { id: '5', name: 'Debí Tirar Más Fotos', artist: 'Bad Bunny', imageUrl: '/images/debi-tirar-mas-fotos.jpg' }
  },
  {
    id: 'p3',
    user: { name: 'Marcos Vinicius', username: 'marcosv', avatarUrl: '/images/default-avatar.png' },
    post: { text: 'Não esperava por essa sonoridade, mas fui positivamente surpreendido. Que trabalho!', timestamp: '1d atrás' },
    album: { id: '1', name: 'nadie sabe lo que va a pasar mañana', artist: 'Bad Bunny', imageUrl: '/images/nadie-sabe.jpg' }
  }
];

const Dashboard: React.FC = () => {
  // Estado para armazenar os posts do feed
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula o carregamento dos posts do feed
    setTimeout(() => {
      setPosts(mockFeedPosts);
      setIsLoading(false);
    }, 1000); // 1 segundo de simulação
  }, []);

  return (
    <div className={styles.dashboardLayout}>
      <Navbar />
      <main className={styles.dashboardMainContent}>
        <h1 className={styles.pageTitle}>Seu Feed</h1>

        <div className={styles.feedContainer}>
          {isLoading ? (
            <p>Carregando feed...</p>
          ) : (
            posts.map(post => (
              <PostItem
                key={post.id}
                user={post.user}
                post={post.post}
                album={post.album}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
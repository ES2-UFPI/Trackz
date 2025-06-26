import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './PaginaPerfil.module.css';
import Tabs from '../../components/Tabs/Tabs';
import PostItem from '../../components/PostItem/PostItem';
// Importe os posts mockados para simular as reviews do usuário
import { mockFeedPosts, IPost } from '../../data/mockData';

// Dados mockados para o usuário
const mockUser = {
  nome: 'Antonio Anderson',
  username: 'and21',
  bio: 'Explorando o universo da música, um álbum de cada vez. Desenvolvedor e fã de synthwave.',
  avatarUrl: '/images/default-avatar.png',
  reviewsCount: 12,
  followersCount: 42,
  followingCount: 58,
};

// Funções mockadas para as props do PostItem
const mockOnLike = (postId: string) => console.log(`Liked post ${postId}`);
const mockOnCommentSubmit = (postId: string, text: string) => console.log(`Commented on ${postId}: ${text}`);


const PaginaPerfil: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Reviews');
  const tabs = ['Reviews', 'Listas', 'Curtidas'];

  // Filtra a lista de posts para mostrar apenas os do usuário do perfil
  const userPosts = mockFeedPosts.filter(
    post => post.user.username === mockUser.username
  );

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.contentContainer}>
        <header className={styles.profileHeader}>
          <img src={mockUser.avatarUrl} alt={`Avatar de ${mockUser.nome}`} className={styles.avatar} />
          <div className={styles.profileInfo}>
            <h1 className={styles.nome}>{mockUser.nome}</h1>
            <h2 className={styles.username}>@{mockUser.username}</h2>
            <p className={styles.bio}>{mockUser.bio}</p>
            <div className={styles.stats}>
              <span><strong>{mockUser.reviewsCount}</strong> reviews</span>
              {/* --- A CORREÇÃO ESTÁ AQUI --- */}
              <span><strong>{mockUser.followersCount}</strong> seguidores</span>
              <span><strong>{mockUser.followingCount}</strong> seguindo</span>
            </div>
          </div>
        </header>
        
        <section className={styles.profileContent}>
          <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
          
          <div className={styles.tabContent}>
            {activeTab === 'Reviews' && (
              <div className={styles.reviewsFeed}>
                {userPosts.length > 0 ? (
                  userPosts.map(post => (
                    <PostItem 
                      key={post.id} 
                      postData={post}
                      onLike={mockOnLike}
                      onCommentSubmit={mockOnCommentSubmit}
                    />
                  ))
                ) : (
                  <p>Este usuário ainda não fez nenhuma review.</p>
                )}
              </div>
            )}
            {activeTab === 'Listas' && <p>As listas do usuário aparecerão aqui.</p>}
            {activeTab === 'Curtidas' && <p>As publicações curtidas pelo usuário aparecerão aqui.</p>}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PaginaPerfil;
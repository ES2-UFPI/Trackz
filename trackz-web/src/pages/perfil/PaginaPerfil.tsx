import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './PaginaPerfil.module.css';

// Dados mockados para o usuário
const mockUser = {
  nome: 'Antonio Anderson',
  username: 'and21',
  bio: 'Explorando o universo da música, um álbum de cada vez. Desenvolvedor e fã de synthwave.',
  avatarUrl: '/images/default-avatar.png', // Lembre-se de colocar uma imagem aqui
  reviewsCount: 12,
  followersCount: 42,
  followingCount: 58,
};

const PaginaPerfil: React.FC = () => {
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
              <span><strong>{mockUser.followersCount}</strong> seguidores</span>
              <span><strong>{mockUser.followingCount}</strong> seguindo</span>
            </div>
          </div>
        </header>
        <section className={styles.profileContent}>
          {/* Futuramente, aqui virão as abas para Reviews, Listas, etc. */}
          <h3 className={styles.sectionTitle}>Atividade Recente</h3>
          <p>As reviews e atividades do usuário aparecerão aqui.</p>
        </section>
      </main>
    </div>
  );
};

export default PaginaPerfil;
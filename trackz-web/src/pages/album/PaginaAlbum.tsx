import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import FormularioPost from '../../components/FormularioPost/FormularioPost';
import styles from './PaginaAlbum.module.css';
import { mockAlbuns, IAlbum } from '../../data/mockData';
import { useNotification } from '../../contexts/NotificationContext';
import AlbumDetailSkeleton from '../../components/AlbumDetailSkeleton/AlbumDetailSkeleton'; // 1. IMPORTE O SKELETON
import { IPost, IComment } from '../../types'; // Importa do arquivo central


// Função auxiliar para formatar a duração em minutos e segundos
const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, '0')}`;
};

const PaginaAlbum: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();

  // Estados
  const [album, setAlbum] = useState<IAlbum | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);
  const { addNotification } = useNotification();

  useEffect(() => {
    // Simula a busca de dados
    console.log('Buscando detalhes para o álbum com ID:', albumId);
    setIsLoading(true);
    setTimeout(() => {
      const albumEncontrado = mockAlbuns.find(a => a.id === albumId);
      setAlbum(albumEncontrado || null);
      setIsLoading(false);
    }, 1500); // Aumentado para 1.5s para ver melhor o skeleton
  }, [albumId]);

  const handlePostSubmit = (textoDoPost: string) => {
    console.log('Post a ser salvo para o álbum:', textoDoPost);
    setIsSubmittingPost(true);
    
    setTimeout(() => {
      addNotification('Post publicado com sucesso!', 'success');
      setIsSubmittingPost(false);
    }, 2000);
  };

  // 2. LÓGICA DE RENDERIZAÇÃO DO CARREGAMENTO ATUALIZADA
  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <Navbar />
        {/* Renderiza o componente de esqueleto da página inteira */}
        <AlbumDetailSkeleton /> 
      </div>
    );
  }

  // Lógica para renderizar se o álbum não for encontrado
  if (!album) {
    return (
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.contentContainer}>
          <h2>Álbum não encontrado.</h2>
          <p>
            <Link to="/explorar">Voltar para a busca</Link>
          </p>
        </main>
      </div>
    );
  }

  // Renderização principal quando o álbum é encontrado
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.contentContainer}>
        <div className={styles.header}>
          <img src={album.imageUrl} alt={`Capa do ${album.name}`} className={styles.albumArt} />
          <div className={styles.headerInfo}>
            <span className={styles.albumType}>ÁLBUM</span>
            <h1 className={styles.albumTitle}>{album.name}</h1>
            <p className={styles.albumMeta}>
              <strong>{album.artist}</strong> • {album.release_date.substring(0, 4)} • {album.tracks.length} músicas
            </p>
          </div>
        </div>

        <div className={styles.trackList}>
          {album.tracks.map((track, index) => (
            <div key={track.id} className={styles.trackRow}>
              <span className={styles.trackNumber}>{index + 1}</span>
              <span className={styles.trackName}>{track.name}</span>
              <span className={styles.trackDuration}>{formatDuration(track.duration_ms)}</span>
            </div>
          ))}
        </div>

        <div className={styles.postSection}>
          <h2>Sua Análise</h2>
          <FormularioPost 
            onSubmitPost={handlePostSubmit} 
            isSubmitting={isSubmittingPost} 
          />
        </div>
      </main>
    </div>
  );
};

export default PaginaAlbum;
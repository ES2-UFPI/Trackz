import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import FormularioPost from '../../components/FormularioPost/FormularioPost'; // 1. IMPORTAÇÃO ADICIONADA
import styles from './PaginaAlbum.module.css';
import { mockAlbuns, IAlbum } from '../../data/mockData'; // 2. IMPORTAÇÃO DOS DADOS CENTRAIS

// Função auxiliar para formatar a duração em minutos e segundos
const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, '0')}`;
};

const PaginaAlbum: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();

  // Estados para os dados do álbum, carregamento e submissão de post
  const [album, setAlbum] = useState<IAlbum | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingPost, setIsSubmittingPost] = useState(false); // 3. ESTADO ADICIONADO

  useEffect(() => {
    // Simula a busca de dados quando o componente é montado
    console.log('Buscando detalhes para o álbum com ID:', albumId);
    
    setIsLoading(true);
    setTimeout(() => {
      // 4. LÓGICA DE BUSCA CORRIGIDA
      // Encontra o álbum correto no nosso "banco de dados" mockado
      const albumEncontrado = mockAlbuns.find(a => a.id === albumId);
      
      setAlbum(albumEncontrado || null); // Define o álbum encontrado ou null se não achar
      setIsLoading(false);
    }, 500); // 0.5 segundo de simulação
  }, [albumId]); // O useEffect roda novamente se o albumId na URL mudar

  // 5. FUNÇÃO ADICIONADA para lidar com a submissão do post
  const handlePostSubmit = (textoDoPost: string) => {
    console.log('Post a ser salvo para o álbum', albumId, ':', textoDoPost);
    
    // Simula o envio para a API
    setIsSubmittingPost(true);
    setTimeout(() => {
      alert('Post publicado com sucesso! (Simulação)');
      setIsSubmittingPost(false);
    }, 2000);
  };


  // Lógica para renderizar o estado de carregamento
  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.contentContainer}>
          <p className={styles.loadingText}>Carregando detalhes do álbum...</p>
        </main>
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

        {/* 6. SEÇÃO DE POSTAGEM ADICIONADA */}
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
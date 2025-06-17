    import React, { useState, useEffect } from 'react';
    import { useParams } from 'react-router-dom';
    import Navbar from '../../components/Navbar/Navbar';
    import styles from './PaginaAlbum.module.css';

    // Interface para uma única faixa
    interface ITrack {
    id: string;
    track_number: number;
    name: string;
    duration_ms: number; // Duração em milissegundos
    }

    // Interface para os detalhes completos do álbum
    interface IAlbumDetails {
    id: string;
    name: string;
    artist: string;
    imageUrl: string;
    release_date: string;
    tracks: ITrack[];
    }

    // Objeto de mock para o álbum "Un Verano Sin Ti"
    const mockAlbumDetails: IAlbumDetails = {
    id: '2',
    name: 'Un Verano Sin Ti',
    artist: 'Bad Bunny',
    imageUrl: '/images/un-verano-sin-ti.jpg', // Usando a imagem local que já configuramos
    release_date: '2022-05-06',
    tracks: [
        { id: 't1', track_number: 1, name: 'Moscow Mule', duration_ms: 245074 },
        { id: 't2', track_number: 2, name: 'Después de la Playa', duration_ms: 230093 },
        { id: 't3', track_number: 3, name: 'Me Porto Bonito', duration_ms: 178527 },
        { id: 't4', track_number: 4, name: 'Tití Me Preguntó', duration_ms: 243933 },
        { id: 't5', track_number: 5, name: 'Un Ratito', duration_ms: 176840 },
        // ... adicione mais músicas se quiser
    ],
    };

    // Função auxiliar para formatar a duração
    const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
    };


    const PaginaAlbum: React.FC = () => {
    const { albumId } = useParams<{ albumId: string }>();

    // Estados para os dados do álbum e para o carregamento
    const [album, setAlbum] = useState<IAlbumDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simula a busca de dados quando o componente é montado
        console.log('Buscando detalhes para o álbum com ID:', albumId);
        
        setIsLoading(true);
        setTimeout(() => {
        // Em uma aplicação real, aqui você faria a chamada fetch para a API do seu backend
        // ex: fetch(`http://localhost:3002/api/spotify/album/${albumId}`)
        setAlbum(mockAlbumDetails); // Usamos os dados mockados
        setIsLoading(false);
        }, 1000); // 1 segundo de simulação
    }, [albumId]); // O useEffect roda novamente se o albumId na URL mudar

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

    if (!album) {
        return (
        <div className={styles.pageWrapper}>
            <Navbar />
            <main className={styles.contentContainer}>
            <p>Álbum não encontrado.</p>
            </main>
        </div>
        );
    }

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
        </main>
        </div>
    );
    };

    export default PaginaAlbum;
import React from 'react';
import { Link } from 'react-router-dom'; // 1. PRECISA DESTA IMPORTAÇÃO
import styles from './ResultadoItem.module.css';

interface ResultadoItemProps {
  id: string; // 2. PRECISA RECEBER O 'id' AQUI
  imageUrl: string;
  title: string;
  artist: string;
}

const ResultadoItem: React.FC<ResultadoItemProps> = ({ id, imageUrl, title, artist }) => {
  return (
    // 3. TODO O CONTEÚDO DEVE ESTAR DENTRO DO <Link>
    <Link to={`/album/${id}`} className={styles.linkWrapper}>
      <div className={styles.itemWrapper}>
        <img src={imageUrl} alt={`Capa do ${title}`} className={styles.albumArt} />
        <div className={styles.itemInfo}>
          <div className={styles.title}>{title}</div>
          <div className={styles.artist}>{artist}</div>
        </div>
      </div>
    </Link>
  );
};

export default ResultadoItem;
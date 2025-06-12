import React from 'react';
import styles from './ResultadoItem.module.css';

interface ResultadoItemProps {
  imageUrl: string;
  title: string;
  artist: string;
}

const ResultadoItem: React.FC<ResultadoItemProps> = ({ imageUrl, title, artist }) => {
  return (
    <div className={styles.itemWrapper}>
      <img src={imageUrl} alt={`Capa do ${title}`} className={styles.albumArt} />
      <div className={styles.itemInfo}>
        <div className={styles.title}>{title}</div>
        <div className={styles.artist}>{artist}</div>
      </div>
    </div>
  );
};

export default ResultadoItem;
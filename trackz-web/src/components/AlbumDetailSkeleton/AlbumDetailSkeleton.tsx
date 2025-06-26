import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './AlbumDetailSkeleton.module.css';

const AlbumDetailSkeleton: React.FC = () => {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.header}>
        <Skeleton width={230} height={230} />
        <div className={styles.headerInfo}>
          <Skeleton width={80} height={15} style={{ marginBottom: '1rem' }} />
          <Skeleton width={400} height={40} />
          <Skeleton width={300} height={40} />
          <Skeleton width={200} height={15} style={{ marginTop: '1rem' }} />
        </div>
      </div>
      <div className={styles.trackList}>
        {/* Cria um array de 5 itens para renderizar 5 skeletons de faixas */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className={styles.trackRow}>
            <Skeleton width={20} />
            <Skeleton width={'80%'} />
            <Skeleton width={40} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumDetailSkeleton;
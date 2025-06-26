import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './ResultadoItemSkeleton.module.css';

const ResultadoItemSkeleton: React.FC = () => {
  return (
    <div className={styles.itemWrapper}>
      <Skeleton width={50} height={50} />
      <div className={styles.itemInfo}>
        <Skeleton width={200} height={15} />
        <Skeleton width={120} height={12} />
      </div>
    </div>
  );
};

export default ResultadoItemSkeleton;
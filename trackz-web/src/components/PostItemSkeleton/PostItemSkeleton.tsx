import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Importa o CSS base da biblioteca
import styles from './PostItemSkeleton.module.css';

const PostItemSkeleton: React.FC = () => {
  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        <Skeleton circle width={40} height={40} />
        <div className={styles.userInfo}>
          <Skeleton width={120} height={15} />
          <Skeleton width={80} height={12} />
        </div>
      </div>
      <div className={styles.postBody}>
        <Skeleton count={2} />
      </div>
      <div className={styles.albumInfo}>
        <Skeleton width={60} height={60} />
        <div className={styles.albumDetails}>
          <Skeleton width={150} height={15} />
          <Skeleton width={100} height={12} />
        </div>
      </div>
    </div>
  );
};

export default PostItemSkeleton;
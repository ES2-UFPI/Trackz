import React from 'react';
import styles from './PostItem.module.css';
import { Link } from 'react-router-dom';

interface PostItemProps {
  user: {
    name: string;
    username: string;
    avatarUrl: string;
  };
  post: {
    text: string;
    timestamp: string;
  };
  album: {
    id: string;
    name: string;
    artist: string;
    imageUrl: string;
  };
}

const PostItem: React.FC<PostItemProps> = ({ user, post, album }) => {
  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        <img src={user.avatarUrl} alt={`Avatar de ${user.name}`} className={styles.userAvatar} />
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user.name}</span>
          <span className={styles.userUsername}>@{user.username}</span>
        </div>
        <span className={styles.timestamp}>{post.timestamp}</span>
      </div>

      <div className={styles.postBody}>
        <p className={styles.postText}>{post.text}</p>
      </div>
      
      <Link to={`/album/${album.id}`} className={styles.albumLink}>
        <div className={styles.albumInfo}>
            <img src={album.imageUrl} alt={`Capa do ${album.name}`} className={styles.albumArt} />
            <div className={styles.albumDetails}>
              <span className={styles.albumName}>{album.name}</span>
              <span className={styles.albumArtist}>{album.artist}</span>
            </div>
        </div>
      </Link>

      <div className={styles.postActions}>
        <button className={styles.actionButton}>Curtir</button>
        <button className={styles.actionButton}>Comentar</button>
        <button className={styles.actionButton}>Compartilhar</button>
      </div>
    </div>
  );
};

export default PostItem;
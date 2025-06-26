import React from 'react';
import styles from './CommentItem.module.css';

interface CommentItemProps {
  comment: {
    user: {
      username: string;
      avatarUrl: string;
    };
    text: string;
  };
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className={styles.commentWrapper}>
      <img src={comment.user.avatarUrl} alt={`Avatar de ${comment.user.username}`} className={styles.avatar} />
      <div className={styles.commentContent}>
        <span className={styles.username}>{comment.user.username}</span>
        <p className={styles.text}>{comment.text}</p>
      </div>
    </div>
  );
};

export default CommentItem;
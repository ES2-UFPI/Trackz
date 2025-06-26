import React, { useState, FormEvent, ChangeEvent } from 'react';
import styles from './PostItem.module.css';
import { Link } from 'react-router-dom';
import Botao from '../Botao/botao';
import CommentItem from '../CommentItem/CommentItem';

// A interface IComment precisa ser definida aqui ou importada
// para que PostItemProps a conheça.
interface IComment {
  id: string;
  user: {
    username: string;
    avatarUrl: string;
  };
  text: string;
}

interface PostItemProps {
  postData: {
    id: string;
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
    likesCount: number;
    isLiked: boolean;
    comments: IComment[];
  };
  onLike: (postId: string) => void;
  onCommentSubmit: (postId: string, commentText: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ postData, onLike, onCommentSubmit }) => {
  const { id, user, post, album, likesCount, isLiked, comments } = postData;

  // Estado para controlar se a seção de comentários está visível
  const [showComments, setShowComments] = useState(false);
  // Estado para o texto do novo comentário
  const [newComment, setNewComment] = useState('');

  // Handler para submeter o formulário de novo comentário
  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // Chama a função passada pelo componente pai (Dashboard)
    onCommentSubmit(id, newComment);
    
    // Limpa o campo de input após o envio
    setNewComment('');
  };

  return (
    <div className={styles.postContainer}>
      {/* Cabeçalho do Post */}
      <div className={styles.postHeader}>
        <img src={user.avatarUrl} alt={`Avatar de ${user.name}`} className={styles.userAvatar} />
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user.name}</span>
          <span className={styles.userUsername}>@{user.username}</span>
        </div>
        <span className={styles.timestamp}>{post.timestamp}</span>
      </div>

      {/* Corpo do Post */}
      <div className={styles.postBody}>
        <p className={styles.postText}>{post.text}</p>
      </div>
      
      {/* Informações do Álbum */}
      <Link to={`/album/${album.id}`} className={styles.albumLink}>
        <div className={styles.albumInfo}>
            <img src={album.imageUrl} alt={`Capa do ${album.name}`} className={styles.albumArt} />
            <div className={styles.albumDetails}>
              <span className={styles.albumName}>{album.name}</span>
              <span className={styles.albumArtist}>{album.artist}</span>
            </div>
        </div>
      </Link>

      {/* Rodapé e Ações do Post */}
      <div className={styles.postFooter}>
        <div className={styles.likesContainer}>
          <span>{likesCount} curtidas</span>
        </div>
        <div className={styles.postActions}>
          <button
            className={`${styles.actionButton} ${isLiked ? styles.liked : ''}`}
            onClick={() => onLike(id)}
          >
            {isLiked ? 'Curtido' : 'Curtir'}
          </button>
          <button className={styles.actionButton} onClick={() => setShowComments(!showComments)}>
            Comentar
          </button>
          <button className={styles.actionButton}>Compartilhar</button>
        </div>
      </div>

      {/* Seção de Comentários (Renderizada Condicionalmente) */}
      {showComments && (
        <div className={styles.commentsSection}>
          {/* Lista de comentários existentes */}
          {comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
          {/* Formulário para adicionar novo comentário */}
          <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
            <input
              type="text"
              className={styles.commentInput}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escreva um comentário..."
            />
            <Botao type="submit" disabled={!newComment.trim()}>Enviar</Botao>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostItem;
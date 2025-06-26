import React, { useState, FormEvent, ChangeEvent } from 'react';
import Botao from '../Botao/botao';
import styles from './FormularioPost.module.css';

// Definimos as props que o componente vai receber
interface FormularioPostProps {
  // A prop 'onSubmitPost' será chamada quando o usuário submeter o post.
  onSubmitPost: (texto: string) => void;
  // Prop para controlar o estado de carregamento, vinda do componente pai
  isSubmitting?: boolean;
}

const FormularioPost: React.FC<FormularioPostProps> = ({ onSubmitPost, isSubmitting = false }) => {
  // Estado para o texto do post
  const [texto, setTexto] = useState('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTexto(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!texto.trim()) return;
    
    // Chama a função que o componente pai (PaginaAlbum) passou via props
    onSubmitPost(texto);
    // Limpa o campo após o envio
    setTexto('');
  };

  return (
    <form className={styles.postForm} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        placeholder="Escreva sua análise ou comentário aqui..."
        value={texto}
        onChange={handleChange}
        rows={5}
        disabled={isSubmitting} // Desabilita o campo enquanto está enviando
      />
      <div className={styles.actions}>
        <Botao type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Publicando...' : 'Publicar'}
        </Botao>
      </div>
    </form>
  );
};

export default FormularioPost;
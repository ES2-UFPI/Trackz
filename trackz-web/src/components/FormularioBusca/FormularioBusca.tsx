import React, { useState, FormEvent, ChangeEvent } from 'react';
import Botao from '../Botao/botao';
import styles from './FormularioBusca.module.css';

// 1. Definimos as props que o componente vai receber
interface FormularioBuscaProps {
  // A prop 'onSearchSubmit' é uma função que será chamada quando o formulário for enviado.
  // Ela passa o termo da busca (query) para o componente pai.
  onSearchSubmit: (query: string) => void;
}

const FormularioBusca: React.FC<FormularioBuscaProps> = ({ onSearchSubmit }) => {
  // 2. O estado para o input de busca agora vive DENTRO deste componente
  const [query, setQuery] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    
    // 3. Quando o formulário é enviado, chamamos a função que recebemos via props
    onSearchSubmit(query);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="O que você quer ouvir?"
        value={query}
        onChange={handleChange}
      />
      <Botao type="submit">Buscar</Botao>
    </form>
  );
};

export default FormularioBusca;
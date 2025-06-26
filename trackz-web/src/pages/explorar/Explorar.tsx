import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Explorar.module.css';
import FormularioBusca from '../../components/FormularioBusca/FormularioBusca';
import ResultadoItem from '../../components/ResultadoItem/ResultadoItem'; // 1. Importe o novo componente
import { mockAlbuns } from '../../data/mockData'; // 1. IMPORTE OS DADOS


// 2. Crie uma interface para o tipo de resultado
interface IResultado {
  id: string;
  imageUrl: string;
  title: string;
  artist: string;
}

const PaginaExplorar: React.FC = () => {
  const [resultados, setResultados] = useState(mockAlbuns); // Pode iniciar com os dados
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchSubmit = (query: string) => {
    console.log('Buscando por:', query);
    setIsLoading(true);
    setTimeout(() => {
      // Em uma aplicação real, você filtraria os resultados aqui ou receberia da API
      setResultados(mockAlbuns); 
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.contentContainer}>
        <h1 className={styles.header}>Explore Músicas</h1>
        <p className={styles.subtitle}>
          Encontre seus álbuns, músicas e artistas favoritos.
        </p>
        
        <div className={styles.searchContainer}>
          <FormularioBusca onSearchSubmit={handleSearchSubmit} />
        </div>

        {/* 6. Renderização condicional */}
        <div className={styles.resultsContainer}>
      {isLoading && <p className={styles.loadingText}>Carregando...</p>}
        {!isLoading && resultados.map(item => (
          <ResultadoItem
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            title={item.name} // Use 'name' em vez de 'title' para consistência
            artist={item.artist}
          />
        ))}
        </div>
      </main>
    </div>
  );
};

export default PaginaExplorar;
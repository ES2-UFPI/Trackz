import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Explorar.module.css';
import FormularioBusca from '../../components/FormularioBusca/FormularioBusca';
import ResultadoItem from '../../components/ResultadoItem/ResultadoItem'; // 1. Importe o novo componente

// 2. Crie uma interface para o tipo de resultado
interface IResultado {
  id: string;
  imageUrl: string;
  title: string;
  artist: string;
}

// 3. Crie os dados mockados
const mockResults: IResultado[] = [
  { id: '1', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45a454accr09371', title: 'Discovery', artist: 'Daft Punk' },
  { id: '2', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273d54a52360851493505315529', title: 'Random Access Memories', artist: 'Daft Punk' },
  { id: '3', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273752e39634e9533a039755661', title: 'Homework', artist: 'Daft Punk' },
];

const PaginaExplorar: React.FC = () => {
  // 4. Crie estados para os resultados e para o carregamento
  const [resultados, setResultados] = useState<IResultado[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchSubmit = (query: string) => {
    console.log('A página Explorar recebeu a busca por:', query);
    
    // 5. Simula a chamada à API
    setIsLoading(true);  // Inicia o carregamento
    setResultados([]); // Limpa os resultados antigos

    setTimeout(() => {
      setResultados(mockResults); // Define os resultados mockados após 1.5 segundos
      setIsLoading(false);      // Termina o carregamento
    }, 1500); // 1.5 segundos de simulação
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
              imageUrl={item.imageUrl}
              title={item.title}
              artist={item.artist}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default PaginaExplorar;
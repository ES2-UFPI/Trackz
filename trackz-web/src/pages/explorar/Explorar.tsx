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
  // O caminho começa com /images/, que aponta para a pasta public/images/
  { id: '5', imageUrl: '/images/debi-tirar-mas-fotos.png', title: 'Debí Tirar Más Fotos', artist: 'Bad Bunny' },
  { id: '1', imageUrl: '/images/nadie-sabe.jpg', title: 'nadie sabe lo que va a pasar mañana', artist: 'Bad Bunny' },
  { id: '2', imageUrl: '/images/un-verano-sin-ti.jpg', title: 'Un Verano Sin Ti', artist: 'Bad Bunny' },
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
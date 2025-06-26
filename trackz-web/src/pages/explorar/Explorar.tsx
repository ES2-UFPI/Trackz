import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Explorar.module.css';
import FormularioBusca from '../../components/FormularioBusca/FormularioBusca';
import ResultadoItem from '../../components/ResultadoItem/ResultadoItem';
import { mockAlbuns, IAlbum } from '../../data/mockData'; // 1. IMPORTA IAlbum TAMBÉM
import ResultadoItemSkeleton from '../../components/ResultadoItemSkeleton/ResultadoItemSkeleton';

// A interface IResultado não é mais necessária, pois importamos IAlbum

const PaginaExplorar: React.FC = () => {
  const [resultados, setResultados] = useState<IAlbum[]>([]); // 2. O estado agora usa a interface IAlbum e começa VAZIO
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Estado para erros

  const handleSearchSubmit = (query: string) => {
    console.log('Buscando por:', query);
    
    // Inicia o processo de busca
    setIsLoading(true);
    setResultados([]); // Limpa os resultados anteriores
    setError(null);

    // Simula a chamada à API
    setTimeout(() => {
      // Em uma aplicação real, aqui você faria a chamada fetch
      // e trataria os dados da resposta
      setResultados(mockAlbuns); 
      setIsLoading(false);
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

        <div className={styles.resultsContainer}>
          {/* 3. LÓGICA DE RENDERIZAÇÃO ATUALIZADA */}
          {isLoading ? (
            // Mostra 5 skeletons enquanto carrega
            <>
              <ResultadoItemSkeleton />
              <ResultadoItemSkeleton />
              <ResultadoItemSkeleton />
              <ResultadoItemSkeleton />
              <ResultadoItemSkeleton />
            </>
          ) : (
            // Mostra os resultados quando o carregamento termina
            resultados.map(item => (
              <ResultadoItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                title={item.name} // Usa 'name' que vem da interface IAlbum
                artist={item.artist}
              />
            ))
          )}
          {/* Opcional: Adicionar mensagem se não houver resultados */}
          {!isLoading && resultados.length === 0 && (
            <p className={styles.loadingText}>Faça uma busca para ver os resultados.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default PaginaExplorar;
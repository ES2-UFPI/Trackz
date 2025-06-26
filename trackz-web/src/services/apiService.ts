import { mockAlbuns, mockFeedPosts } from '../data/mockData'; // Importe seus mocks

const API_URL = 'http://localhost:3002';

// ... suas funções de login e register ...

// --- FUNÇÕES DA API DO SPOTIFY ---

export const searchSpotify = async (query: string) => {
  console.log(`(API Service) Buscando por: ${query}`);
  // const response = await fetch(`${API_URL}/spotify/search?q=${encodeURIComponent(query)}`);
  // if (!response.ok) throw new Error('Falha na busca');
  // return response.json();

  // Por enquanto, retorna os dados mockados
  return new Promise(resolve => setTimeout(() => resolve({ tracks: { items: mockAlbuns } }), 500));
};

export const getAlbumDetails = async (albumId: string) => {
  console.log(`(API Service) Buscando detalhes do álbum: ${albumId}`);
  // const response = await fetch(`${API_URL}/spotify/album/${albumId}`);
  // if (!response.ok) throw new Error('Álbum não encontrado');
  // return response.json();

  // Por enquanto, busca nos dados mockados
  const album = mockAlbuns.find(a => a.id === albumId);
  return new Promise((resolve, reject) => setTimeout(() => {
    if (album) resolve(album);
    else reject(new Error('Álbum não encontrado'));
  }, 500));
};

// --- FUNÇÕES DA API DO TRACKZ (Posts, etc.) ---

export const getFeedPosts = async () => {
  console.log(`(API Service) Buscando posts do feed`);
  // const response = await fetch(`${API_URL}/feed`);
  // ...

  // Por enquanto, retorna os dados mockados
  return new Promise(resolve => setTimeout(() => resolve(mockFeedPosts), 500));
};

export const createPost = async (albumId: string, text: string) => {
    console.log(`(API Service) Criando post para o álbum ${albumId}: ${text}`);
    // const response = await fetch(`${API_URL}/posts`, { method: 'POST', ... });
    // ...

    // Por enquanto, só simula sucesso
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
};
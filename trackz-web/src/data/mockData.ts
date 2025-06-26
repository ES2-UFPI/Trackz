// --- 1. DEFINIÇÕES DE TIPO (INTERFACES) ---

// Para uma única faixa dentro de um álbum
export interface ITrack {
  id: string;
  track_number: number;
  name: string;
  duration_ms: number;
}

// Para os detalhes completos de um álbum
export interface IAlbum {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
  release_date: string;
  tracks: ITrack[];
}

// Para um único comentário
export interface IComment {
  id: string;
  user: {
    username: string;
    avatarUrl: string;
  };
  text: string;
}

// Para um único post no feed
export interface IPost {
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
  album: IAlbum; // Usa a interface de álbum completa
  likesCount: number;
  isLiked: boolean;
  comments: IComment[];
}


// --- 2. DADOS MOCKADOS (EXPORTADOS) ---

// Nosso "banco de dados" mockado de álbuns
export const mockAlbuns: IAlbum[] = [
  {
    id: '5',
    name: 'Debí Tirar Más Fotos',
    artist: 'Bad Bunny',
    imageUrl: '/images/debi-tirar-mas-fotos.png',
    release_date: '2025-01-05',
    tracks: [
      { id: 't1f', track_number: 1, name: 'Intro Fictícia', duration_ms: 60000 },
      { id: 't2f', track_number: 2, name: 'Otra Canción', duration_ms: 210000 },
    ],
  },
  {
    id: '1',
    name: 'nadie sabe lo que va a pasar mañana',
    artist: 'Bad Bunny',
    imageUrl: '/images/nadie-sabe.jpg',
    release_date: '2023-10-13',
    tracks: [
      { id: 't1n', track_number: 1, name: 'NADIE SABE', duration_ms: 379964 },
      { id: 't2n', track_number: 2, name: 'MONACO', duration_ms: 267253 },
    ],
  },
  {
    id: '2',
    name: 'Un Verano Sin Ti',
    artist: 'Bad Bunny',
    imageUrl: '/images/un-verano-sin-ti.jpg',
    release_date: '2022-05-06',
    tracks: [
      { id: 't1u', track_number: 1, name: 'Moscow Mule', duration_ms: 245074 },
      { id: 't2u', track_number: 2, name: 'Después de la Playa', duration_ms: 230093 },
    ],
  },
];

// Nosso "feed" mockado de posts
export const mockFeedPosts: IPost[] = [
  {
    id: 'p1',
    user: { name: 'Antonio Anderson', username: 'and21', avatarUrl: '/images/default-avatar.png' },
    post: { text: 'Este álbum é uma obra-prima! A produção é incrível.', timestamp: '2h atrás' },
    album: mockAlbuns[2], // Referencia "Un Verano Sin Ti"
    likesCount: 15,
    isLiked: false,
    comments: [
      { id: 'c1', user: { username: 'gabLCS', avatarUrl: '/images/default-avatar.png' }, text: 'Concordo totalmente!' },
    ],
  },
  {
    id: 'p2',
    user: { name: 'Gabriel Leonardo', username: 'gabLCS', avatarUrl: '/images/default-avatar.png' },
    post: { text: 'Uma viagem nostálgica. Recomendo demais!', timestamp: '5h atrás' },
    album: mockAlbuns[0], // Referencia "Debí Tirar Más Fotos"
    likesCount: 32,
    isLiked: true,
    comments: [],
  },
];
// src/types/index.ts

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
  id:string;
  user: {
    name: string;
    username: string;
    avatarUrl: string;
  };
  post: {
    text: string;
    timestamp: string;
  };
  album: IAlbumSummary; // Usa um resumo do álbum
  likesCount: number;
  isLiked: boolean;
  comments: IComment[];
}

// Para uma faixa dentro de um álbum
export interface ITrack {
  id: string;
  track_number: number;
  name: string;
  duration_ms: number;
}

// Para a lista de resultados da busca (resumo do álbum)
export interface IAlbumSummary {
    id: string;
    name: string;
    artist: string;
    imageUrl: string;
}

// Para os detalhes completos de um álbum
export interface IAlbum extends IAlbumSummary {
  release_date: string;
  tracks: ITrack[];
}
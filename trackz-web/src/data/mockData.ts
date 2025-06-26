// Interface para uma única faixa
export interface ITrack {
  id: string;
  track_number: number;
  name: string;
  duration_ms: number;
}

// Interface para os detalhes completos do álbum
export interface IAlbum {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
  release_date: string;
  tracks: ITrack[];
}

// Nosso "banco de dados" mockado
export const mockAlbuns: IAlbum[] = [
  {
    id: '5',
    name: 'Debí Tirar Más Fotos',
    artist: 'Bad Bunny',
    imageUrl: '/images/debi-tirar-mas-fotos.jpg',
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
      { id: 't3n', track_number: 3, name: 'FINA', duration_ms: 216960 },
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
      { id: 't3u', track_number: 3, name: 'Me Porto Bonito', duration_ms: 178527 },
    ],
  },
];
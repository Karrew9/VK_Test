export interface Movie {
  id: number;
  name: string;
  year: number;
  rating: {
    kp: number;
    imdb?: number;
  };
  poster?: {
    url?: string;
    previewUrl?: string;
  };
  genres?: Array<{
    name: string;
  }>;
}

export interface MovieDetails extends Movie {
  description: string;
  persons: {
    id: number;
    name: string;
    photo: string;
    profession: string;
  }[];
  similarMovies: Movie[];
}

export interface ApiResponse<T> {
  docs: T[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
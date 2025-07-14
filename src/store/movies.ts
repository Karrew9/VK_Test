import { makeAutoObservable, runInAction } from 'mobx';
import { fetchMovies } from '../api/kinopoisk';
import { Movie, ApiResponse } from '../api/types';

class MoviesStore {
  movies: Movie[] = [];
  isLoading = false;
  error: string | null = null;
  page = 1;
  hasMore = true;
  limit = 50;

  constructor() {
    makeAutoObservable(this);
  }

  async loadMovies(filters = {}, reset = false) {
    if (this.isLoading || !this.hasMore && !reset) return;

    if (reset) {
      this.reset();
    }

    console.log('[MoviesStore] Начало загрузки. Параметры:', {
    page: this.page,
    limit: this.limit,
    filters
  });

    this.isLoading = true;
    this.error = null;

    try {
      console.log('[MoviesStore] Отправка запроса...');
      const startTime = Date.now();

      const response = await Promise.race([
      fetchMovies(this.page, this.limit, filters),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout exceeded')), 10000)
      )
    ]) as ApiResponse<Movie[]>;
      
      console.log(`[MoviesStore] Ответ получен за ${Date.now() - startTime}ms`, {
      status: 'success',
      total: response.total,
      received: response.docs.length,
    });

      runInAction(() => {
        const newMovies: Movie[] = response.docs.flat();
        this.movies = [...this.movies, ...newMovies];
        this.page += 1;
        this.hasMore = response.page < response.pages;
        this.isLoading = false;
        
        console.log('[MoviesStore] Общее количество фильмов после обновления:', this.movies.length);
      });
    } catch (error) {
      console.error('[MoviesStore] Полная ошибка:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
      runInAction(() => {
        this.error = 'Не удалось загрузить фильмы';
        this.isLoading = false;
      });
    }
  }

  reset() {
    this.movies = [];
    this.page = 1;
    this.hasMore = true;
    this.isLoading = false;
    this.error = null;
  }
}

export default new MoviesStore();
import { makeAutoObservable } from 'mobx';
import { Movie } from '../api/types';

class FavoritesStore {
  favorites: Movie[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFavorites();
  }

  loadFavorites() {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      try {
        this.favorites = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
  }

  saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  addFavorite(movie: Movie) {
    if (!this.favorites.some(fav => fav.id === movie.id)) {
      this.favorites.push(movie);
      this.saveFavorites();
    }
  }

  removeFavorite(id: number) {
    this.favorites = this.favorites.filter(movie => movie.id !== id);
    this.saveFavorites();
  }

  isFavorite(id: number) {
    return this.favorites.some(movie => movie.id === id);
  }
}

export default new FavoritesStore();
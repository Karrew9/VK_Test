import { makeAutoObservable } from 'mobx';

class FiltersStore {
  selectedGenres: string[] = [];
  ratingRange: [number, number] = [0, 10];
  yearRange: [number, number] = [1990, new Date().getFullYear()];

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedGenres(genres: string[]) {
    this.selectedGenres = genres;
  }

  setRatingRange(range: [number, number]) {
    this.ratingRange = range;
  }

  setYearRange(range: [number, number]) {
    this.yearRange = range;
  }

  get filters() {
    return {
      'genres.name': this.selectedGenres.join('|'),
      'rating.kp': `${this.ratingRange[0]}-${this.ratingRange[1]}`,
      year: `${this.yearRange[0]}-${this.yearRange[1]}`,
    };
  }
}

export default new FiltersStore();
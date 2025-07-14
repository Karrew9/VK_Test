import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Slider,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
} from '@mui/material';
import FiltersStore from '../../store/filters';

const genres = [
  'драма',
  'комедия',
  'фантастика',
  'ужасы',
  'триллер',
  'боевик',
  'мелодрама',
  'детектив',
  'приключения',
  'фэнтези',
];

const Filters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Initialize filters from URL
    const params = Object.fromEntries(searchParams.entries());
    
    if (params.genres) {
      FiltersStore.setSelectedGenres(params.genres.split(','));
    }
    
    if (params.rating) {
      const [min, max] = params.rating.split('-').map(Number);
      FiltersStore.setRatingRange([min, max]);
    }
    
    if (params.year) {
      const [min, max] = params.year.split('-').map(Number);
      FiltersStore.setYearRange([min, max]);
    }
  }, [searchParams]);

  const handleGenreChange = (genre: string) => {
    const updatedGenres = FiltersStore.selectedGenres.includes(genre)
      ? FiltersStore.selectedGenres.filter(g => g !== genre)
      : [...FiltersStore.selectedGenres, genre];
    
    FiltersStore.setSelectedGenres(updatedGenres);
    updateUrlParams();
  };

  const handleRatingChange = (event: Event, newValue: number | number[]) => {
    FiltersStore.setRatingRange(newValue as [number, number]);
  };

  const handleYearChange = (event: Event, newValue: number | number[]) => {
    FiltersStore.setYearRange(newValue as [number, number]);
  };

  const updateUrlParams = () => {
    const params = new URLSearchParams();
    
    if (FiltersStore.selectedGenres.length > 0) {
      params.set('genres', FiltersStore.selectedGenres.join(','));
    }
    
    params.set('rating', `${FiltersStore.ratingRange[0]}-${FiltersStore.ratingRange[1]}`);
    params.set('year', `${FiltersStore.yearRange[0]}-${FiltersStore.yearRange[1]}`);
    
    setSearchParams(params);
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Фильтры
      </Typography>
      
      <Typography gutterBottom>Жанры</Typography>
      <FormGroup>
        {genres.map(genre => (
          <FormControlLabel
            key={genre}
            control={
              <Checkbox
                checked={FiltersStore.selectedGenres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
              />
            }
            label={genre}
          />
        ))}
      </FormGroup>
      
      <Typography gutterBottom sx={{ mt: 2 }}>
        Рейтинг: {FiltersStore.ratingRange[0]} - {FiltersStore.ratingRange[1]}
      </Typography>
      <Slider
        value={FiltersStore.ratingRange}
        onChange={handleRatingChange}
        onChangeCommitted={updateUrlParams}
        min={0}
        max={10}
        step={0.1}
        valueLabelDisplay="auto"
      />
      
      <Typography gutterBottom sx={{ mt: 2 }}>
        Год выпуска: {FiltersStore.yearRange[0]} - {FiltersStore.yearRange[1]}
      </Typography>
      <Slider
        value={FiltersStore.yearRange}
        onChange={handleYearChange}
        onChangeCommitted={updateUrlParams}
        min={1990}
        max={new Date().getFullYear()}
        step={1}
        marks
        valueLabelDisplay="auto"
      />
    </Box>
  );
};

export default Filters;
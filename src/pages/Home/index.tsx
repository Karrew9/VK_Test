import React, { useEffect } from 'react';
import { Grid, Container, CircularProgress, Typography, Box } from '@mui/material';
import MovieCard from '../../components/MovieCard';
import Filters from '../../components/Filters';
import MoviesStore from '../../store/movies';
import FiltersStore from '../../store/filters';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { observer } from 'mobx-react-lite';

const Home: React.FC = observer(() => {
  const loadMoreMovies = React.useCallback((reset = false) => {
    if (!MoviesStore.isLoading && (reset || MoviesStore.hasMore)) {
      console.log('[Home] Инициация загрузки фильмов', { reset });
      MoviesStore.loadMovies(FiltersStore.filters, reset);
    }
  }, []);

  // Для бесконечного скролла
  useInfiniteScroll(() => loadMoreMovies(false));

  // Для сброса при изменении фильтров
  useEffect(() => {
    console.log('[Home] Фильтры изменились', FiltersStore.filters);
    loadMoreMovies(true);
  }, [FiltersStore.filters, loadMoreMovies]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{xs:12, md:9}}>
          <Filters />
        </Grid>
        <Grid size={{xs:12, md:9}}>
          <Grid container spacing={4}>
            {MoviesStore.movies.map((movie) => (
              <Grid key={movie.id} size={{xs:12, sm:6, md:4, lg:3}}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
          
          {MoviesStore.isLoading && (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          )}
          
          {MoviesStore.error && (
            <Typography color="error" align="center">
              {MoviesStore.error}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
});

export default Home;
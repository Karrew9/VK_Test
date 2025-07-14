import React from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import MovieCard from '../../components/MovieCard';
import FavoritesStore from '../../store/favorites';
import { observer } from 'mobx-react-lite';

const Favorites: React.FC = observer(() => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Избранные фильмы
      </Typography>
      
      {FavoritesStore.favorites.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography variant="h6">Список избранного пуст</Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {FavoritesStore.favorites.map(movie => (
            <Grid key={movie.id} size={{xs:12, sm:6, md:4, lg:3}}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
});

export default Favorites;
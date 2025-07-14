import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Chip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
} from '@mui/material';
import { fetchMovieById } from '../../api/kinopoisk';
import { MovieDetails } from '../../api/types';
import FavoritesStore from '../../store/favorites';
import ConfirmModal from '../../components/ConfirmModal';

const Movie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieById(id!);
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  const handleAddToFavorites = () => {
    if (movie) {
      setOpenModal(true);
    }
  };

  const handleConfirmAdd = () => {
    if (movie) {
      FavoritesStore.addFavorite(movie);
      setOpenModal(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Назад
      </Button>
      
      <Grid container spacing={4}>
        <Grid size={{xs:12, md:4}}>
          <Box
            component="img"
            src={movie.poster?.url || '/placeholder.jpg'}
            alt={movie.name}
            sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
          />
          
          <Box mt={2}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleAddToFavorites}
              disabled={FavoritesStore.isFavorite(movie.id)}
            >
              {FavoritesStore.isFavorite(movie.id) ? 'В избранном' : 'Добавить в избранное'}
            </Button>
          </Box>
        </Grid>
        
        <Grid size={{xs:12, md:8}}>
          <Typography variant="h3" gutterBottom>
            {movie.name} ({movie.year})
          </Typography>
          
          <Box display="flex" alignItems="center" mb={2}>
            <Rating value={(movie.rating?.kp || 0) / 2} precision={0.5} readOnly />
            <Typography variant="body1" ml={1}>
              {movie.rating?.kp.toFixed(1)}
            </Typography>
          </Box>
          
          <Box mb={3}>
            {movie.genres.map(genre => (
              <Chip key={genre.name} label={genre.name} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>
          
          <Typography variant="body1" paragraph>
            {movie.description}
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h5" gutterBottom>
            Актеры
          </Typography>
          
          <List sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {movie.persons
              ?.filter(person => person.profession === 'актеры')
              .slice(0, 10)
              .map(person => (
                <ListItem key={person.id} sx={{ width: 'auto', pr: 2 }}>
                  <ListItemAvatar>
                    <Avatar src={person.photo} alt={person.name} />
                  </ListItemAvatar>
                  <ListItemText primary={person.name} />
                </ListItem>
              ))}
          </List>
        </Grid>
      </Grid>
      
      <ConfirmModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirmAdd}
        title="Добавить в избранное"
        message={`Вы уверены, что хотите добавить фильм "${movie.name}" в избранное?`}
      />
    </Container>
  );
};

export default Movie;
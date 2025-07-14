import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../../api/types';
import FavoritesStore from '../../store/favorites';
import { Card, CardMedia, CardContent, Typography, Rating, Box, IconButton  } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/system';
import { observer } from 'mobx-react-lite';

const StyledCard = styled(Card)({
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.03)',
  },
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = observer(({ movie }) => {
  const navigate = useNavigate();
  const isFavorite = FavoritesStore.isFavorite(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      FavoritesStore.removeFavorite(movie.id);
    } else {
      FavoritesStore.addFavorite(movie);
    }
  };

  return (
    <StyledCard onClick={() => navigate(`/movie/${movie.id}`)}>
      <IconButton
        aria-label="add to favorites"
        onClick={handleFavoriteClick}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          color: isFavorite ? 'red' : 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      
      <CardMedia
        component="img"
        height="300"
        image={movie.poster?.url || '/placeholder.jpg'}
        alt={movie.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {movie.name}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            {movie.year}
          </Typography>
          <Rating
            value={movie.rating?.kp ? movie.rating.kp / 2 : 0}
            precision={0.5}
            readOnly
          />
        </Box>
      </CardContent>
    </StyledCard>
  );
});

export default MovieCard;
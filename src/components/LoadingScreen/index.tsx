import { CircularProgress, Box } from '@mui/material';

export default function LoadingScreen() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress size={60} />
    </Box>
  );
}
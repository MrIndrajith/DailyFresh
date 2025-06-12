import React from "react";
import { Box, Typography, Paper, Grid, Card, CardContent, CardMedia, Button, IconButton, Avatar, Snackbar } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAlert from '@mui/material/Alert';
import { useShop } from "../../context/ShopContext";

const getTextColor = (mode) => (mode === 'dark' ? '#fff' : '#1e3c72');

const WishlistPage = ({ mode = 'dark' }) => {
  const { wishlist, removeFromWishlist } = useShop();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMsg, setSnackbarMsg] = React.useState('');

  const handleRemove = (name) => {
    removeFromWishlist(name);
    setSnackbarMsg('Removed from wishlist!');
    setSnackbarOpen(true);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: mode === 'dark'
          ? 'linear-gradient(135deg, #1e3c72 0%, #23272f 100%)'
          : 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        flexDirection: 'column',
        py: 6
      }}
    >
      <Paper elevation={8} sx={{
        p: 5,
        borderRadius: 4,
        minWidth: 400,
        maxWidth: 900,
        width: '90%',
        background: mode === 'dark' ? 'rgba(34,39,47,0.98)' : 'rgba(255,255,255,0.98)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(4px)',
        mb: 4
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#1e3c72', width: 64, height: 64, mb: 1 }}>
            <FavoriteBorderIcon sx={{ fontSize: 40, color: '#fff' }} />
          </Avatar>
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: getTextColor(mode) }}>
            Your Wishlist
          </Typography>
        </Box>
        {wishlist.length === 0 ? (
          <Typography sx={{ color: getTextColor(mode), textAlign: 'center', mt: 4 }}>No items in wishlist.</Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {wishlist.map((product, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  background: mode === 'dark' ? '#23272f' : '#f9f9f9',
                  minHeight: 340,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 2
                }}>
                  <CardMedia
                    component="img"
                    image={product.img}
                    alt={product.name}
                    sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 2, mb: 2 }}
                  />
                  <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={600} sx={{ color: getTextColor(mode) }}>{product.name}</Typography>
                    <Typography variant="subtitle1" sx={{ color: mode === 'dark' ? '#b0b8c1' : 'text.secondary' }}>₹{product.price}</Typography>
                  </CardContent>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleRemove(product.name)}
                    sx={{ borderRadius: 2, fontWeight: 600, mb: 1 }}
                  >
                    Remove
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <MuiAlert onClose={() => setSnackbarOpen(false)} severity="info" sx={{ width: '100%' }}>
            {snackbarMsg}
          </MuiAlert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default WishlistPage;
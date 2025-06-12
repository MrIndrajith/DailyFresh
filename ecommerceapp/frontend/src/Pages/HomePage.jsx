import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, InputBase, IconButton, Grid, Card, CardContent, CardMedia, Button, Snackbar, Avatar } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MuiAlert from '@mui/material/Alert';
import { useShop } from "../../context/ShopContext";
import { useNavigate } from 'react-router-dom';

const getTextColor = (mode) => (mode === 'dark' ? '#fff' : '#1e3c72');

const HomePage = ({ mode = 'dark', searchTerm, isLoggedIn }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const { addToCart, addToWishlist } = useShop();
  const [search, setSearch] = useState(searchTerm || "");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        // Map backend fields to frontend fields if needed
        setProducts(data.map(p => ({
          name: p.title || p.name || '',
          price: p.price,
          img: p.image || p.img || '',
        })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleWishlist = (product) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    addToWishlist(product);
    setSnackbarMsg(`Added ${product.name} to wishlist!`);
    setSnackbarOpen(true);
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    addToCart(product);
    setSnackbarMsg(`Added ${product.name} to cart!`);
    setSnackbarOpen(true);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    product.name !== "Premium Coffee"
  );

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
            <ShoppingCartIcon sx={{ fontSize: 40, color: '#fff' }} />
          </Avatar>
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: getTextColor(mode) }}>
            Welcome to DailyFresh
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2, color: mode === 'dark' ? '#b0b8c1' : 'text.secondary' }}>
            Discover the best deals of the day!
          </Typography>
        </Box>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mx: 'auto', mb: 4, background: mode === 'dark' ? '#23272f' : '#fff' }}
          onSubmit={e => e.preventDefault()}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, color: getTextColor(mode) }}
            placeholder="Search for products"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <IconButton type="submit" sx={{ p: '10px', color: getTextColor(mode) }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        {loading && <Typography sx={{ color: getTextColor(mode), textAlign: 'center', mt: 4 }}>Loading products...</Typography>}
        {error && <Typography sx={{ color: 'red', textAlign: 'center', mt: 4 }}>{error}</Typography>}
        <Grid container spacing={3} justifyContent="center">
          {filteredProducts.length === 0 && !loading && !error ? (
            <Grid item xs={12}>
              <Typography sx={{ color: getTextColor(mode) }} align="center">No products found.</Typography>
            </Grid>
          ) : (
            filteredProducts.map((product, idx) => (
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
                    sx={{ width: 180, height: 180, objectFit: 'cover', borderRadius: 2, mb: 2, mt: 2 }}
                  />
                  <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={600} sx={{ color: getTextColor(mode) }}>{product.name}</Typography>
                    <Typography variant="subtitle1" sx={{ color: mode === 'dark' ? '#b0b8c1' : 'text.secondary' }}>₹{product.price}</Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleAddToCart(product)}
                      sx={{ borderRadius: 2, fontWeight: 600 }}
                    >
                      Add to Cart
                    </Button>
                    <IconButton
                      color="secondary"
                      onClick={() => handleWishlist(product)}
                      sx={{ borderRadius: 2 }}
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <MuiAlert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
            {snackbarMsg}
          </MuiAlert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default HomePage;
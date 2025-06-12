import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Alert, Button, Stack } from '@mui/material';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      const res = await fetch('/api/products', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom color="primary">Product List</Typography>
        <div>
          <Button variant="contained" color="secondary" onClick={fetchProducts} disabled={loading}>
            Refresh
          </Button>
          <Button variant="outlined" color="primary" onClick={() => window.location.reload()} sx={{ ml: 2 }}>
            Reload Page
          </Button>
        </div>
      </Stack>
      {loading && <CircularProgress color="secondary" />}
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card sx={{ bgcolor: 'background.paper', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" color="text.primary">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                <Typography variant="subtitle1" color="secondary" sx={{ mt: 1 }}>
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductListPage;
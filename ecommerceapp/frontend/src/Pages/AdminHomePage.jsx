import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, InputBase, IconButton, Grid, Card, CardContent, CardMedia, Button, Snackbar, Avatar, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const AdminHomePage = ({ mode = 'dark' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin-login');
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        navigate('/admin-login');
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:5000/api/products', {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
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
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete product');
      setProducts(products.filter(p => p._id !== id));
      setSnackbarMsg('Product deleted successfully!');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMsg('Failed to delete product');
      setSnackbarOpen(true);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${currentProduct._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProduct)
      });
      if (!res.ok) throw new Error('Failed to update product');
      setProducts(products.map(p => p._id === currentProduct._id ? currentProduct : p));
      setSnackbarMsg('Product updated successfully!');
      setSnackbarOpen(true);
      setDialogOpen(false);
    } catch (err) {
      setSnackbarMsg('Failed to update product');
      setSnackbarOpen(true);
    }
  };

  const handleAdd = async () => {
    try {
      const newProduct = { title: "New Product", description: "", price: 0, image: "" };
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (!res.ok) throw new Error('Failed to add product');
      const addedProduct = await res.json();
      setProducts([...products, addedProduct]);
      setSnackbarMsg('Product added successfully!');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMsg('Failed to add product');
      setSnackbarOpen(true);
    }
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
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
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: mode === 'dark' ? '#fff' : '#1e3c72' }}>
            Admin Dashboard
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2, color: mode === 'dark' ? '#b0b8c1' : 'text.secondary' }}>
            Manage your products
          </Typography>
        </Box>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mx: 'auto', mb: 4, background: mode === 'dark' ? '#23272f' : '#fff' }}
          onSubmit={e => e.preventDefault()}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, color: mode === 'dark' ? '#fff' : '#1e3c72' }}
            placeholder="Search for products"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <IconButton type="submit" sx={{ p: '10px', color: mode === 'dark' ? '#fff' : '#1e3c72' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button variant="contained" color="primary" onClick={handleAdd} sx={{ mb: 2 }}>
          Add New Product
        </Button>
        <Grid container spacing={3} justifyContent="center">
          {filteredProducts.map((product, idx) => (
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
                  image={product.image}
                  alt={product.title}
                  sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 2, mb: 2 }}
                />
                <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ color: mode === 'dark' ? '#fff' : '#1e3c72' }}>{product.title}</Typography>
                  <Typography variant="subtitle1" sx={{ color: mode === 'dark' ? '#b0b8c1' : 'text.secondary' }}>₹{product.price}</Typography>
                </CardContent>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(product)}
                    sx={{ borderRadius: 2, fontWeight: 600 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(product._id)}
                    sx={{ borderRadius: 2, fontWeight: 600 }}
                  >
                    Delete
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
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
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={currentProduct?.title || ""}
              onChange={e => setCurrentProduct({ ...currentProduct, title: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={currentProduct?.description || ""}
              onChange={e => setCurrentProduct({ ...currentProduct, description: e.target.value })}
            />
            <TextField
              label="Price"
              fullWidth
              margin="normal"
              type="number"
              value={currentProduct?.price || 0}
              onChange={e => setCurrentProduct({ ...currentProduct, price: e.target.value })}
            />
            <TextField
              label="Image URL"
              fullWidth
              margin="normal"
              value={currentProduct?.image || ""}
              onChange={e => setCurrentProduct({ ...currentProduct, image: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="secondary">Cancel</Button>
            <Button onClick={handleSave} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default AdminHomePage;

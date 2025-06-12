const express = require('express');
const Product = require('../models/Product');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Authentication middleware for admin routes
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Not an admin.' });
    }
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Apply authentication middleware to all admin routes
router.use(authenticateAdmin);

// Get all products (admin view)
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new product
router.post('/products', async (req, res) => {
  try {
    const { name, description, price, img } = req.body;
    const product = new Product({ name, description, price, img });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Invalid product data' });
  }
});

// Edit a product (including image link)
router.patch('/products/:id', async (req, res) => {
  try {
    const updateFields = req.body;
    // Allow updating image link (img field)
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Invalid update' });
  }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Delete failed' });
  }
});

// Get all users (admin view)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password hash
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

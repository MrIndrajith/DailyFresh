const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure you have a User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, address, dob, email, number, password } = req.body;
    // Optionally: check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // Save hashedPassword instead of req.body.password
  
    const user = new User({ name, address, dob, email, number, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    console.log("Login attempt:", req.body);
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const user = await User.findOne({ email });
    console.log(user)


    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = (password == user.password);
    console.log(isMatch);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Optionally, generate a JWT here if you want authentication
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      name: user.name,
      email: user.email,
      // token, // Uncomment if you add JWT
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin login route
router.post('/admin-login', async (req, res) => {
  try {
    const { password } = req.body;
    // Allow access if password is 'admin123', ignore username/email
    if (password === 'admin123') {
      const token = jwt.sign(
        { role: 'admin', any: true },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      return res.json({ token });
    } else {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

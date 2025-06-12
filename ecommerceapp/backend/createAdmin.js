const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const createAdmin = async () => {
  try {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existingAdmin = await User.findOne({ email: adminUsername });
    if (existingAdmin) {
      console.log('Admin account already exists.');
      return;
    }

    // No hashing, store plain password (not recommended for production)
    const admin = new User({
      name: 'Admin',
      email: adminUsername,
      password: adminPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('Admin account created successfully.');
  } catch (err) {
    console.error('Error creating admin account:', err);
  } finally {
    mongoose.connection.close();
  }
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    createAdmin();
  })
  .catch(err => console.error('MongoDB connection error:', err));
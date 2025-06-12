const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

async function fixAdminRole() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const result = await User.updateOne(
      { email: 'admin' },
      { $set: { role: 'admin' } }
    );
    if (result.modifiedCount > 0) {
      console.log('Admin role updated successfully.');
    } else if (result.matchedCount > 0) {
      console.log('Admin already has the correct role.');
    } else {
      console.log('No admin user found with email "admin".');
    }
  } catch (err) {
    console.error('Error updating admin role:', err);
  } finally {
    mongoose.connection.close();
  }
}

fixAdminRole();

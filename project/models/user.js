const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true  // Index added for efficient querying
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true  // Index added for efficient querying
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt timestamps
});

// Validation example: email format
userSchema.path('email').validate((email) => {
  const emailRegex = /.+@.+\..+/;
  return emailRegex.test(email);
}, 'Invalid email format');

const User = mongoose.model('User', userSchema);
module.exports = User;

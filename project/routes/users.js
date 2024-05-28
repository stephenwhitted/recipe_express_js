// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET all users
router.get('/', async (req, res) => {
  const users = await User.find().populate('pantry');
  res.json(users);
});

// POST create new user
router.post('/', async (req, res) => {
  const { username, email, pantry } = req.body;
  const user = new User({ username, email, pantry });
  await user.save();
  res.json(user);
});

// PATCH update user pantry
router.patch('/:id/pantry', async (req, res) => {
  const { pantry } = req.body;
  await User.findByIdAndUpdate(req.params.id, { pantry });
  res.json({ message: 'Pantry updated' });
});

module.exports = router;

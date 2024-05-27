// routes/ingredients.js
const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient');

// GET all ingredients
router.get('/', async (req, res) => {
  const ingredients = await Ingredient.find();
  res.json(ingredients);
});

// POST create new ingredient
router.post('/', async (req, res) => {
  const { name } = req.body;
  const ingredient = new Ingredient({ name });
  await ingredient.save();
  res.json(ingredient);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');

// GET all ingredients
router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ingredient by ID
router.get('/:id', getIngredient, (req, res) => {
  res.json(res.ingredient);
});

// POST create a new ingredient
router.post('/', async (req, res) => {
  const ingredient = new Ingredient({
    name: req.body.name,
    quantity: req.body.quantity
  });
  try {
    const newIngredient = await ingredient.save();
    res.status(201).json(newIngredient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update ingredient
router.patch('/:id', getIngredient, async (req, res) => {
  if (req.body.name != null) {
    res.ingredient.name = req.body.name;
  }
  if (req.body.quantity != null) {
    res.ingredient.quantity = req.body.quantity;
  }
  try {
    const updatedIngredient = await res.ingredient.save();
    res.json(updatedIngredient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE ingredient
router.delete('/:id', getIngredient, async (req, res) => {
  try {
    await res.ingredient.remove();
    res.json({ message: 'Deleted Ingredient' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get ingredient by ID
async function getIngredient(req, res, next) {
  let ingredient;
  try {
    ingredient = await Ingredient.findById(req.params.id);
    if (ingredient == null) {
      return res.status(404).json({ message: 'Cannot find ingredient' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.ingredient = ingredient;
  next();
}

module.exports = router;

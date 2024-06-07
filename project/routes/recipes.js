const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('ingredients').populate('user');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET recipe by ID
router.get('/:id', getRecipe, (req, res) => {
  res.json(res.recipe);
});

// POST create a new recipe
router.post('/', async (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    ingredients: req.body.ingredients,
    user: req.body.user
  });
  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update recipe
router.patch('/:id', getRecipe, async (req, res) => {
  if (req.body.title != null) {
    res.recipe.title = req.body.title;
  }
  if (req.body.description != null) {
    res.recipe.description = req.body.description;
  }
  if (req.body.ingredients != null) {
    res.recipe.ingredients = req.body.ingredients;
  }
  try {
    const updatedRecipe = await res.recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE recipe
router.delete('/:id', getRecipe, async (req, res) => {
  try {
    await res.recipe.remove();
    res.json({ message: 'Deleted Recipe' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get recipe by ID
async function getRecipe(req, res, next) {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.id).populate('ingredients').populate('user');
    if (recipe == null) {
      return res.status(404).json({ message: 'Cannot find recipe' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.recipe = recipe;
  next();
}

module.exports = router;

// routes/recipes.js
const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('ingredients');
    res.render('recipes/list', { recipes });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

// GET new recipe form
router.get('/new', (req, res) => {
  res.render('recipes/new');
});

// POST create new recipe
router.post('/', async (req, res) => {
  try {
    const { title, ingredients, instructions, cuisine, dietaryRestrictions } = req.body;
    const recipe = new Recipe({ title, ingredients, instructions, cuisine, dietaryRestrictions });
    await recipe.save();
    res.redirect('/recipes');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

// GET edit recipe form
router.get('/:id/edit', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.render('recipes/edit', { recipe });
  } catch (error) {
    res.status(404).send('Recipe not found');
  }
});

// PATCH update recipe
router.patch('/:id', async (req, res) => {
  try {
    const { title, ingredients, instructions, cuisine, dietaryRestrictions } = req.body;
    await Recipe.findByIdAndUpdate(req.params.id, { title, ingredients, instructions, cuisine, dietaryRestrictions });
    res.redirect('/recipes');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

// DELETE recipe
router.delete('/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/recipes');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

// GET recipe details
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('ingredients');
    res.render('recipes/detail', { recipe });
  } catch (error) {
    res.status(404).send('Recipe not found');
  }
});

module.exports = router;

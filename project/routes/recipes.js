//routes/recipes.js
const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

//GET all recipes
router.get('/', async (req, res) => {
    const recipes = await Recipe.find().populate('ingredients');
    res.render('recipes/list', { recipes});
});


//GET new recipe from
router.get('/new', (req, res) => {
    res.render('recipes/new');
});

// POST create new recipe
router.post('/', async (req, res) => {
    const { title, ingredients, instructions, cuisine, dietaryRestrictions } = req.body;
    const recipe = new Recipe({ title, ingredients, instructions, cuisine, dietaryRestrictions });
    await recipe.save();
    res.redirect('/recipes');
  });
  
  // GET edit recipe form
  router.get('/:id/edit', async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    res.render('recipes/edit', { recipe });
  });
  
  // PATCH update recipe
  router.patch('/:id', async (req, res) => {
    const { title, ingredients, instructions, cuisine, dietaryRestrictions } = req.body;
    await Recipe.findByIdAndUpdate(req.params.id, { title, ingredients, instructions, cuisine, dietaryRestrictions });
    res.redirect('/recipes');
  });
  
  // DELETE recipe
  router.delete('/:id', async (req, res) => {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/recipes');
  });
  
  module.exports = router;
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true  // Index added for efficient querying
  },
  description: String,
  ingredients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient',
    required: true
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt timestamps
});

// Validation example: Ensure at least one ingredient
recipeSchema.path('ingredients').validate((ingredients) => {
  return ingredients.length > 0;
}, 'At least one ingredient is required');

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true  // Index added for efficient querying
  },
  quantity: {
    type: String,
    required: true
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt timestamps
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;

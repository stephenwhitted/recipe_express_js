const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  }
});

ingredientSchema.index({ name: 1 });

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;

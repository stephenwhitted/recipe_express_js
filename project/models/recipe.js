const mongoose = require("mongoose");       

const recipeSchema = new mongoose.Schema({
    title: String,
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
    instructions: String,
    cuisine: String,
    dietaryRestrictions: [String]
});

module.exports = mongoose.model('Recipe', recipeSchema);
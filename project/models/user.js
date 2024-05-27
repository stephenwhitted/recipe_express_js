//models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    pantry: [{ type: mongooseeSchema.Types.ObjectId, ref: 'Ingredient' }]

});

module.exports = mongoose.model('User', userSchema);
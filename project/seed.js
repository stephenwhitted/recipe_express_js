const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Ingredient = require('./models/Ingredient');
const Recipe = require('./models/Recipe');

// MongoDB Atlas connection string from environment variable
const dbUri = process.env.MONGO_URI;

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  seedDatabase().then(() => {
    mongoose.connection.close();
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

async function seedDatabase() {
  try {
    await User.deleteMany({});
    await Ingredient.deleteMany({});
    await Recipe.deleteMany({});

    const users = await User.insertMany([
      { username: 'user1', email: 'user1@example.com', password: 'password123' },
      { username: 'user2', email: 'user2@example.com', password: 'password123' },
      { username: 'user3', email: 'user3@example.com', password: 'password123' }
    ]);

    const ingredients = await Ingredient.insertMany([
      { name: 'Flour', quantity: '1 kg' },
      { name: 'Sugar', quantity: '500 g' },
      { name: 'Butter', quantity: '200 g' }
    ]);

    await Recipe.insertMany([
      { 
        title: 'Chocolate Cake',
        description: 'Delicious chocolate cake recipe.',
        ingredients: [ingredients[0]._id, ingredients[1]._id],
        user: users[0]._id
      },
      {
        title: 'Pancakes',
        description: 'Fluffy pancakes recipe.',
        ingredients: [ingredients[0]._id, ingredients[2]._id],
        user: users[1]._id
      }
    ]);

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database', err);
  }
}

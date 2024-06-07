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
      { username: 'user3', email: 'user3@example.com', password: 'password123' },
      { username: 'user4', email: 'user4@example.com', password: 'password123' },
      { username: 'user5', email: 'user5@example.com', password: 'password123' },
      { username: 'user6', email: 'user6@example.com', password: 'password123' },
      { username: 'user7', email: 'user7@example.com', password: 'password123' },
      { username: 'user8', email: 'user8@example.com', password: 'password123' },
      { username: 'user9', email: 'user9@example.com', password: 'password123' },
      { username: 'user10', email: 'user10@example.com', password: 'password123' }
    ]);

    const ingredients = await Ingredient.insertMany([
      { name: 'Flour', quantity: '1 kg' },
      { name: 'Sugar', quantity: '500 g' },
      { name: 'Butter', quantity: '200 g' },
      { name: 'Eggs', quantity: '12' },
      { name: 'Milk', quantity: '1 liter' },
      { name: 'Baking Powder', quantity: '50 g' },
      { name: 'Vanilla Extract', quantity: '30 ml' },
      { name: 'Salt', quantity: '100 g' },
      { name: 'Cocoa Powder', quantity: '200 g' },
      { name: 'Yeast', quantity: '100 g' }
    ]);

    await Recipe.insertMany([
      { 
        title: 'Chocolate Cake',
        description: 'Delicious chocolate cake recipe.',
        ingredients: [ingredients[0]._id, ingredients[1]._id, ingredients[2]._id, ingredients[8]._id],
        user: users[0]._id
      },
      {
        title: 'Pancakes',
        description: 'Fluffy pancakes recipe.',
        ingredients: [ingredients[0]._id, ingredients[2]._id, ingredients[4]._id, ingredients[3]._id],
        user: users[1]._id
      },
      {
        title: 'Bread',
        description: 'Homemade bread recipe.',
        ingredients: [ingredients[0]._id, ingredients[2]._id, ingredients[9]._id, ingredients[7]._id],
        user: users[2]._id
      },
      {
        title: 'Cookies',
        description: 'Crispy cookies recipe.',
        ingredients: [ingredients[0]._id, ingredients[1]._id, ingredients[2]._id, ingredients[6]._id],
        user: users[3]._id
      },
      {
        title: 'Muffins',
        description: 'Soft muffins recipe.',
        ingredients: [ingredients[0]._id, ingredients[1]._id, ingredients[3]._id, ingredients[5]._id],
        user: users[4]._id
      },
      {
        title: 'Waffles',
        description: 'Crispy waffles recipe.',
        ingredients: [ingredients[0]._id, ingredients[1]._id, ingredients[2]._id, ingredients[4]._id],
        user: users[5]._id
      },
      {
        title: 'Pizza Dough',
        description: 'Easy pizza dough recipe.',
        ingredients: [ingredients[0]._id, ingredients[9]._id, ingredients[7]._id, ingredients[4]._id],
        user: users[6]._id
      },
      {
        title: 'Brownies',
        description: 'Fudgy brownies recipe.',
        ingredients: [ingredients[0]._id, ingredients[1]._id, ingredients[2]._id, ingredients[8]._id],
        user: users[7]._id
      },
      {
        title: 'Cupcakes',
        description: 'Colorful cupcakes recipe.',
        ingredients: [ingredients[0]._id, ingredients[1]._id, ingredients[3]._id, ingredients[6]._id],
        user: users[8]._id
      },
      {
        title: 'Cinnamon Rolls',
        description: 'Soft cinnamon rolls recipe.',
        ingredients: [ingredients[0]._id, ingredients[1]._id, ingredients[2]._id, ingredients[4]._id],
        user: users[9]._id
      }
    ]);

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database', err);
  }
}

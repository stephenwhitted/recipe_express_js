// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const recipeRoutes = require('./routes/recipes');
const ingredientRoutes = require('./routes/ingredients');
const userRoutes = require('./routes/users');
const customMiddleware = require('./middleware/customMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
require('dotenv').config();

const app = express();

// MongoDB Atlas connection string from environment variable
const dbUri = process.env.MONGO_URI;

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(customMiddleware.logRequest);

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Middleware to set title for each route group
app.use('/recipes', (req, res, next) => {
  res.locals.title = 'Recipes';
  next();
}, recipeRoutes);

app.use('/ingredients', (req, res, next) => {
  res.locals.title = 'Ingredients';
  next();
}, ingredientRoutes);

app.use('/users', (req, res, next) => {
  res.locals.title = 'Users';
  next();
}, userRoutes);

app.use(errorMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;

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

const app = express();

// MongoDB Atlas connection string with actual password
const dbUri = 'mongodb+srv://stephenwhitted:Tk1cJCAQw6AL0lTa@mongopractice.nxavmch.mongodb.net/?retryWrites=true&w=majority&appName=MongoPractice';

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(customMiddleware.logRequest);

app.use('/recipes', recipeRoutes);
app.use('/ingredients', ingredientRoutes);
app.use('/users', userRoutes);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

mongoose.connect('mongodb://localhost:27017/Bookstore')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => res.redirect('/books'));
app.use('/books', bookRoutes);

app.listen(8001, () => console.log('Server running on http://localhost:8001'));

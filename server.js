const express = require('express');
const methodOverride = require('method-override');
const categoryRoutes = require('./route/categoryRoute');
const productRoutes = require('./route/productRoute');
const path = require('path');
require("dotenv").config({quiet: true});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

app.get('/', (req, res) => res.redirect('/products'));

app.listen(process.env.PORT || 7777, () => console.log(`Server running on http://localhost:${process.env.PORT}`));

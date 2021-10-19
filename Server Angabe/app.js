const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const routes = require('./routes/cars.js');
require('colors');
require('dotenv').config();

// Middleware
const {
  errorHandler,
  notFoundHandler,
} = require('./middleware/errorHandler.js');

const app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(helmet());

app.use(express.json());

// routes
app.use('/', routes);

app.use(notFoundHandler);

app.use(errorHandler);

const PORT = process.env.PORT ?? 5000;

app.listen(PORT);

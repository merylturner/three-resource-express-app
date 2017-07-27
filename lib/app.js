const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');

const tacos = require('./routes/tacos');
const restaurants = require('./routes/restaurants');

app.use('/tacos', tacos);
app.use('/restaurants', restaurants);

app.use(errorHandler);

module.exports = app;
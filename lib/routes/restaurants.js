const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');
const jsonParser = require('body-parser').json();

router 
    .use(jsonParser)
    .post('/', (req, res, next) => {
        const restaurant = new Restaurant(req.body);
        restaurant
            .save()
            .then(restaurant => res.send(restaurant))
            .catch(next);
    });

module.exports = router;
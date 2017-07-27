const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');
const jsonParser = require('body-parser').json();

router 
    .post('/', (req, res, next) => {
        
    });

module.exports = router;
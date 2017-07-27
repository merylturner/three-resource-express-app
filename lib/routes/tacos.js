const express = require('express');
const router = express.Router();
const Taco = require('../models/taco');
const jsonParser = require('body-parser').json();

router
    .use(jsonParser)
    .post('/', (req, res, next) => {
        const taco = new Taco(req.body);
        taco
            .save()
            .then(taco => res.send(taco))
            .catch(next);
    });

module.exports = router;
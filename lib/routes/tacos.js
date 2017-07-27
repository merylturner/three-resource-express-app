const express = require('express');
const router = express.Router();
const Taco = require('../models/taco');
const jsonParser = require('body-parser').json();

router
    .get('/:id', (req, res, next) => {
        Taco.findById(req.params.id)
            .lean()
            .then(taco => {
                if(!taco) res.status(404).send(`cannot GET ${req.params.id}`);
                else res.send(taco);
            })
            .catch(next);

    })
    
    .use(jsonParser)
    .post('/', (req, res, next) => {
        const taco = new Taco(req.body);
        taco
            .save()
            .then(taco => res.send(taco))
            .catch(next);
    });


module.exports = router;
const express = require('express');
const router = express.Router();
const Drink = require('../models/drink');
const jsonParser = require('body-parser').json();

router
    .use(jsonParser)
    .post('/', (req, res, next) => {
        const drink = new Drink(req.body);
        drink   
            .save()
            .then(drink => res.send(drink))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Drink.findById(req.params.id)
            .lean()
            .then(drink => {
                if(!drink) res.status(404).send(`cannot get ${req.params.id}`);
                else res.send(drink);

            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Drink.find()
            .lean()
            .select('name type')
            .then(drinks => res.send(drinks))
            .catch(next);
    });

module.exports = router;

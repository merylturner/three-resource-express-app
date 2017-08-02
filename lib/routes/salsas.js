const express = require('express');
const router = express.Router();
const Salsa = require('../models/salsa');
const jsonParser = require('body-parser').json();
// const ensureRole = require('../auth/ensure-role');

// const adminRole = ensureRole('admin');

router
    .use(jsonParser)
    .post('/', (req, res, next) => { //adminrole
        const salsa = new Salsa(req.body);
        salsa
            .save()
            .then(salsa => res.send(salsa))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Salsa.findById(req.params.id)
            .lean()
            .then(salsa => {
                if(!salsa) res.status(404).send(`cannot GET ${req.params.id}`);
                else res.send(salsa);
            })
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Salsa.find()
            .lean()
            .select('name type')
            .then(salsas => res.send(salsas))
            .catch(next);
    });

module.exports = router;
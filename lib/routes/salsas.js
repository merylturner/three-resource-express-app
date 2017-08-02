const express = require('express');
const router = express.Router();
const Salsa = require('../models/salsa');
const jsonParser = require('body-parser').json();

router
    .use(jsonParser);

module.exports = router;
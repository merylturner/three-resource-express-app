const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ensureAuth = require('../../lib/auth/ensure-auth')();
const tokenService = require('../../lib/auth/token-service');

function hasEmailAndPassword(req, res, next) {
    const { email, password} = req.body;
    if(!email || !password) {
        return next({
            code: 400,
            error: 'email and password must be supplied'
        });
    }
    next();
}

// router
//     .get('/verify', ensureAuth, (req, res) => {
//         res.send({valid: true});
//     });

module.exports = router;
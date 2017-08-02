const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ensureAuth = require('../../lib/auth/ensure-auth')();
const tokenService = require('../../lib/auth/token-service');

function hasEmailAndPassword(req, res, next) {

}

module.exports = router;
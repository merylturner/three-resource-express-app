const Router = require('express').Router;
const router = Router();
const User = require('../models/user');
const tokenService = require('../auth/token-service');
const ensureAuth = require('../auth/ensure-auth')();
const jsonParser = require('body-parser').json();

function hasEmailAndPassword(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        return next({
            code: 400,
            error: 'email and password must be supplied'
        });
    }
    next();
}

router
    .use(jsonParser)
    .get('/verify', ensureAuth, (req, res) => {
        res.send({ valid: true });
    })

    .post('/signup', hasEmailAndPassword, (req, res, next) => {
        const { email, password } = req.body;

        User.exists({ email })
            .then(exists => {
                if (exists) {
                    throw next({
                        code: 400,
                        error: 'email already in use'
                    });
                }
                const user = new User({ email });
                user.generateHash(password);
                return user.save();
            })
            .then(user => tokenService.sign(user))
            .then(token => {
                res.send({ token });
            })
            .catch(next);
    })

    .post('/signin', hasEmailAndPassword, (req, res, next) => {
        const { email, password } = req.body;

        User.findOne({ email })
            .then(user => {
                if (!user || !user.comparePassword(password)) {
                    throw next({
                        code: 401,
                        error: 'Invalid Login'
                    });
                }
                return user;
            })
            .then(user => tokenService.sign(user))
            .then(token => res.send({ token }))
            .catch(next);
    });

module.exports = router;
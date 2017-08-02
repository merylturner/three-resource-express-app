const db = require('./helpers/db');
const request = require('./helpers/request');
const { assert } = require('chai');


describe('auth', () => {

    before(db.drop);


    const user = {
        email: 'user',
        password: '123'
    };

    describe('user management', () => {

        // before(() => {
        //     return request.post('/auth/signup')
        //         .send({ email: 'meryl@meryl.com', password: '123' })
        //         .then(res => token = res.body.token);
        // });

        const badRequest = (url, data, code, error) => {
            request
                .post(url)
                .send(data)
                .then(() => {
                    throw new Error('status should not be okay');
                },
                res => {
                    assert.equal(res.status, code);
                    assert.equal(res.response.body.error, error);
                });
        };

        it('signup requires an email', () => {
            badRequest('/auth/signup', { password: '123' }, 400, 'email and password must be supplied');
        });

        it('signup requires a password', () => {
            badRequest('/auth/signup', { email: 'user' }, 400, 'email and password must be supplied');
        });

        let token = '';

        it('user signup', () => {
            request
                .post('/auth/signup')
                .send(user)
                .then(res => assert.ok(token = res.body.token));
        });

        it('cannot use the same email', () => {
            badRequest('/auth/signup', user, 400, 'email already in use');
        });

        it('sign in with wrong user', () => {
            badRequest('/auth/signup', { email: 'bad user', password: user.password }, 400, 'Invalid Login');
        });

        it('sign in with wrong password', () => {
            badRequest('/auth/signup', { email: user.email, password: 'bad' }, 400, 'Invalid Login');
        });

        it('user signup', () => {
            request
                .post('/auth/signup')
                .send(user)
                .then(res => assert.ok(res.body.token));
        });

        it('invalid token', () => {
            request
                .get('/auth/verify')
                .set('Authorization', 'bad token')
                .then(() => {
                    throw new Error('successful response not expected');
                },
                res => assert.equal(res.status.code, 401));
        });

        it('valid token', () => {
            request
                .get('/auth/verify')
                .set('Authorization', token)
                .then(res => assert.ok(res.body));
        });
    });

    // describe.skip('unauthorized', () => {
    //     it('returns 401 with no token', () => {
    //         return request
    //             .get('/salsas')
    //             .then(() => {
    //                 throw new Error('status should not be 200');
    //             }, res => {
    //                 assert.equal(res.status.code, 401);
    //                 assert.equal(res.response.body.error, 'No Authorization Found');
    //             });
    //     });
    // });
});
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// process.env.MONGODB_URI = 'mongodb://localhost:27017/auth-test';

require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');
const request = chai.request(app);

describe('auth', () => {
    before(() => connection.dropDatabase());

    // before((user = { email: 'meryl@meryl.com', password: '123' }) => {
    //     return request.post('/auth/signup')
    //         .send(user)
    //         .then(res => res.body.token);
    // });

    const user = {
        email: 'user',
        password: '123'
    };

    describe('user management', () => {

        const badRequest = (url, data, code, error) => {
            request
                .post(url)
                .send(data)
                .then(() => {
                    throw new Error('status should not be okay');
                }),
            res => {
                assert.equal(res.status, code);
                assert.equal(res.response.body.error, error);
            };
        };
        it('signup requires an email', () => {
            badRequest('/auth/signup', { password: '123'}, 400, 'email and password must be supplied');
        });

        it('signup requires a password', () => {
            badRequest('/auth/signup', { email: 'user'}, 400, 'email and password must be supplied');
        });
    });
});
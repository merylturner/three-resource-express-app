const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/salsas-test';

require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');
const request = chai.request(app);

describe('salsas REST api', () => {
    before(() => connection.dropDatabase());

    const salsaVerde = {
        name: 'salsa verde',
        type: 'green',
        howSpicy: 'medium'
    };

    const mangoSalsa = {
        name: 'mango salsa',
        type: 'mango',
        howSpicy: 'mild'
    };

    const hotAndSpicy = {
        name: 'hot and spicy',
        type: 'red',
        howSpicy: 'hot'
    };

    function saveSalsa(salsa) {
        return request.post('/salsas')
            .send(salsa)
            .then(({ body }) => {
                salsa._id = body._id;
                salsa.__v = body.__v;
                return body;
            });
    }

    it('saves a salsa', () => {
        return saveSalsa(salsaVerde)
            .then(savedSalsa => {
                assert.isOk(savedSalsa._id);
                assert.deepEqual(savedSalsa, salsaVerde);
            });
    });

    it('gets a salsa if it exists', () => {
        return request
            .get(`/salsas/${salsaVerde._id}`)
            .then(res => res.body)
            .then(salsa => {
                assert.deepEqual(salsa, salsaVerde);
            });
    });

    it('returns 404 if salsa does not exist', () => {
        return request.get('/salsas/609889997766543344455432')
            .then(() => {
                throw new Error('successful status code not expected');
            },
            ({ response }) => {
                assert.ok(response.notFound);
            });
    });
});
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/restaurants-test';

require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');
const request = chai.request(app);

describe('restaurant REST api', () => {
    before(() => connection.dropDatabase());

    const tacoBell = {
        name: 'taco bell',
        address: {
            street: '900 sw taco st',
            city: 'tacotown',
            state: 'TX',
            zip: 56799
        }
    };

    const judas = {
        name: 'judas',
        address: {
            street: '100 sketchy st',
            city: 'betrayerville',
            state: 'NB',
            zip: 66666
        }
    };

    function saveRestaurant(restaurant) {
        return request.post('/restaurants')
            .send(restaurant)
            .then(({ body }) => {
                restaurant._id = body._id;
                restaurant.__v = body.__v;
                return body;
            });
    }

    it('saves a restaurant', () => {
        return saveRestaurant(judas)
            .then(savedRestaurant => {
                assert.isOk(savedRestaurant._id);
                assert.deepEqual(savedRestaurant, judas);
            });
    });

    it('gets restaurant if it exists', () => {
        return request 
            .get(`/restaurants/${judas._id}`)
            .then(res => res.body)
            .then(restaurant => {
                assert.deepEqual(restaurant, judas);
            });
    });

    it('gets all restaurants', () => {
        return Promise.all([
            saveRestaurant(tacoBell)
        ])
            .then(() => request.get('/restaurants'))
            .then(res => {
                const restaurants = [res.body[0].name, res.body[1].name];
                assert.deepEqual(restaurants, [judas.name, tacoBell.name]);
            });
    });
});
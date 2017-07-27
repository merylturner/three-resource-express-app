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
});
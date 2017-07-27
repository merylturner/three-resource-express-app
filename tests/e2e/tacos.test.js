const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/tacos-test';

require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');
const request = chai.request(app);

describe('tacos REST api', () => {
    before(() => connection.dropDatabase());

    const nomNom = {
        name: 'nomNom',
        type: 'seafood',
        cheese: true,
        toppings: 'onion'
    };

    const babyTaco = {
        name: 'babyTaco',
        type: 'chicken',
        cheese: false,
        toppings: 'cilantro'
    };

    const angryTaco = {
        name: 'angryTaco',
        type: 'veggie',
        cheese: true,
        toppings: 'tomato'
    };

    function saveTaco(taco) {
        return request.post('/tacos')
            .send(taco)
            .then(({body}) => {
                taco._id = body._id;
                taco.__v = body.__v;
                return body;
            });
    }
    it('saves a taco', () => {
        return saveTaco(angryTaco)
            .then(savedTaco => {
                assert.isOk(savedTaco._id);
                assert.deepEqual(savedTaco, angryTaco);
            });

    });
});
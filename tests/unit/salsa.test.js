const Salsa = require('../../lib/models/salsa');
const { assert } = require('chai');

describe('salsa model', () => {

    it('validates the salsa',() => {
        const salsa = new Salsa({
            name: 'salsa verde',
            type: 'green',
            howSpicy: 'medium'
        });
        return salsa.validate();
    });
});
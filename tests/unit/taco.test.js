const Taco = require('../../lib/models/taco');
// const { assert } = require('chai');

describe('Taco model', () => {
    
    it('validates the taco', () => {
        const taco = new Taco({
            name: 'mucho spicy',
            type: 'pork',
            cheese: true,
            toppings: 'lettuce'
        });
        return taco.validate();
    });

});

const Restaurant = require('../../lib/models/restaurant');
const { assert } = require('chai');

describe('restaurant model', () => {
    
    it('validates the restaurant', () => {
        const restaurant = new Restaurant({
            name: 'meowmeow',
            address: {
                street: '123 Cat Street',
                city: 'party-town',
                state: 'RI',
                zip: 80908
            }
        });

        return restaurant.validate();

    });
    
});
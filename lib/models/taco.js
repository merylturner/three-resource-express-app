const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = {
    name: String,
    required: true
};
const schema = new Schema({
    name: requiredString,
    kind: {
        type: String,
        required: true,
        enum:['chicken', 'pork', 'beef', 'seafood','veggie']
    },
    cheese: Boolean,
    toppings: {
        type: String,
        enum:['lettuce', 'tomato']
    }
});

module.exports = mongoose.model('Taco', schema);
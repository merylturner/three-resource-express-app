const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const requiredString = {
    type: String,
    required: true
};

const schema = new Schema({
    email: requiredString,
    hash: requiredString,
    roles: [String],
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Salsa'
    }]
});

schema.method('generateHash', function(password) {
    this.hash = bcrypt.hashSync(password, 8);
});

schema.method('comparePassword', function(password){
    return bcrypt.compareSync(password,this.hash);
});

schema.static('exists', function(query){
    return this.find(query)
        .count()
        .then(count => (count > 0));
});

module.exports = mongoose.model('User', schema);
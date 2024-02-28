const mongoose = require('mongoose');

module.exports = mongoose.model('Store', mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}));
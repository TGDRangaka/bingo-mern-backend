const mongoose = require('mongoose');

module.exports = mongoose.model('Store', mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: 'images/store.png'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}));
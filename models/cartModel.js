const mongoose = require('mongoose');

module.exports = mongoose.model('Cart', mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: true
        },
        qty: {
            type: Number,
            required: true
        }
    }]
}));
const mongoose = require('mongoose');

module.exports = mongoose.model('Order', mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    review: {
        type: Object,
        default: null
    },
    total: {
        type: Number,
        required: true
    },
    orderDate: {
        type: String,
        required: true
    },
    receivedDate: {
        type: String,
        default: null
    }
}));
const mongoose = require('mongoose');

module.exports = mongoose.model('Order_Item', mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: true,
        default: null
    }
}));
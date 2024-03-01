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
    isReviewed: {
        type: Boolean,
        required: true,
        default: false
    },
    review: {
        name: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        }
    }
}));
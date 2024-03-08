const mongoose = require('mongoose');

module.exports = mongoose.model('Order', mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    orderItems: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    }
}));
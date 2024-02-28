const mongoose = require('mongoose');

module.exports = mongoose.model('Order', mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
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
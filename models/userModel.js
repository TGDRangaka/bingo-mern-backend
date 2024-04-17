const mongoose = require('mongoose');
module.exports = mongoose.model('User', mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: {
            no: {
                type: String,
                required: true
            },
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            }
        },
        required: false,
        default: null
    },
    creditCard: {
        type: {
            number: {
                type: String,
                required: true
            },
            expiryMonth: {
                type: String,
                required: true
            },
            expiryYear: {
                type: String,
                required: true
            },
            cvv: {
                type: String,
                required: true
            }
        },
        required: false,
        default: null
    }
}));
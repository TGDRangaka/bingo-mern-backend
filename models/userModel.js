const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
        required: false
    },
    creditCard: {
        type: {
            number: {
                type: String,
                required: true
            },
            expiration: {
                type: String,
                required: true
            },
            cvv: {
                type: String,
                required: true
            }
        },
        required: false
    }
})

const User = mongoose.model('Users', userSchema);

module.exports = User;
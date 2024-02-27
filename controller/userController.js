const User = require('../models/userModel');

class UserController {
    getAll(){
        return User.find();
    }
}

module.exports = new UserController();

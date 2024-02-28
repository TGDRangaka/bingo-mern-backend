const User = require('../models/userModel');

class UserController {
    getAll(){
        return User.find();
    }

    save(user){
        return new User(user).save();
    }
}

module.exports = new UserController();

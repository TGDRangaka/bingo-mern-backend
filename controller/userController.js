const User = require('../models/userModel');

class UserController {
    getAll(){
        return User.find();
    }

    save(user){
        return new User(user).save();
    }

    update(id, user){
        return User.findByIdAndUpdate(id, {$set: user});
    }

    delete(id){
        return User.findByIdAndDelete(id);
    }

    checkValidity(username, password){
        return User.findOne({email: username, password: password});
    }
}

module.exports = new UserController();

const User = require('../models/userModel');
const Cart = require('../controller/cartController');
const Store = require('../controller/storeController');


class UserController {
    getAll(){
        return User.find();
    }

    register(user){
        return new User(user).save()
        .then(data => {
        // console.log(user);
            return Cart.save({userId: data._id, items: []}).then(cart => {
                return {user: data, cart: cart, store: null}
            })
        })
    }

    update(id, user){
        return User.findByIdAndUpdate(id, {$set: user});
    }

    delete(id){
        return User.findByIdAndDelete(id);
    }

    login(username, password){
        return User.findOne({email: username, password: password}).then(user => {
            if(user){
                return Cart.getCart(user._id).then(cart => {
                    return Store.getStoreByUser(user._id).then(store => {
                        return {user: user, cart: cart, store: store}
                    })
                })
            }else{
                return {user: null, cart: null, store: null}
            }
        })
    }
}

module.exports = new UserController();

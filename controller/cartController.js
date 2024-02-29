const Cart = require('../models/cartModel');

class CartController{

    getCart(userId){
        return Cart.findOne({userId: userId})
    }

    getAll(){
        return Cart.find();
    }

    addItemToCart(cartId, data){
        return Cart.findById(cartId).then(cart => {
            const items = cart.items;
            let isAlreadyAdded = false;
            items.map(item => {
                if(item.itemId.toString() === data.itemId.toString()){
                    item.qty += data.qty;
                    isAlreadyAdded = true;
                }
            })
            if(!isAlreadyAdded){
                items.push(data);
            }
            return new Cart(cart).save()
        }).catch(err => {return err});
    }

    save(cart){
        console.log(cart);
        return new Cart(cart).save();
    }
}

module.exports = new CartController();
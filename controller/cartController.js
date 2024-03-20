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

    deleteItem(cartId, itemId){
        return Cart.findById(cartId).then(cart => {
            const items = cart.items;
            items.map(item => {
                if(item.itemId.toString() === itemId.toString()){
                    items.splice(items.indexOf(item), 1);
                }
            })
            return new Cart(cart).save()
        }).catch(err => {return err});
    }

    updateCartItems(cartId, items){
        return Cart.findByIdAndUpdate(
            cartId,
            { $set: { items: items } },
            { new: true }
          );
    }

    clearCart(userId){
        return Cart.updateOne(
            {userId: userId},
            { $set: { items: [] } }
          )
    }

    removeItemFromAllCarts(itemId){
        return Cart.find().then(carts => Promise.all(carts.map(cart => this.deleteItem(cart._id, itemId))));
    }
}

module.exports = new CartController();
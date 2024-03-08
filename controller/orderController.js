const OrderItem = require('../models/orderModel');
const Cart = require('../controller/cartController');

class OrderItemController {
    saveOrder(cartOrItem ,order) {
        let orderItems = []
        order.orderItems.map(oItem => {
            orderItems.push({
                itemId: oItem.itemId,
                qty: oItem.qty,
                review: null
            })
        })
        order = {...order, orderItems: orderItems};
        if(cartOrItem === 'cart') Cart.clearCart(order.userId);
        return new OrderItem(order).save()
    }
}

module.exports = new OrderItemController();
const Order = require('../models/orderModel');
const Cart = require('../controller/cartController');
const { mongoose } = require('mongoose');

class OrderItemController {
    async saveOrder(cartOrItem ,order) {
        let ordersToSave = []
        order.orderItems.map(oItem => {
            ordersToSave.push({
                userId: order.userId,
                itemId: oItem.itemId,
                qty: oItem.qty,
                total: oItem.total,
                orderDate: new Date().toLocaleString(),
                receivedDate: null,
                review: null
            })
        })

        const session = await mongoose.startSession();
        session.startTransaction();
        try{
            if(cartOrItem === 'cart') Cart.clearCart(order.userId).then(d => console.log(d)).catch(err => console.log(err));
            const data = await Promise.all(ordersToSave.map(order => new Order(order).save()))
            session.commitTransaction();
            return data;
        }catch (err) {
            session.abortTransaction();
            console.log(err);
            throw err
        }finally{
            session.endSession();
        }
    }

    updateOrder(order){
        return Order.findByIdAndUpdate(order._id, {$set: order});
    }

    getOrders(userId){
        return Order.find({userId: userId});
    }
}

module.exports = new OrderItemController();
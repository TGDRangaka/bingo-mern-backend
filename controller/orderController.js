const Order = require('../models/orderModel');
const Cart = require('../controller/cartController');
const Item = require('../models/itemModel');
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
            if(cartOrItem === 'cart') await Cart.clearCart(order.userId);
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

    async updateOrder(order){
        if(order.status === 'Received') await Item.findByIdAndUpdate(order.itemId, { $inc: { sold: 1 } });
        return Order.findByIdAndUpdate(order._id, {$set: order});
    }

    async saveReview(order){
        let orders = await Order.find({itemId: order.itemId});
        orders.push(order);
        let ratings = [0,0,0,0,0];
        let totRatingsCount = 0;
        let totRatings = 0;
        let itemRating = 0;
        orders.map(o => {
            if(o.review) {
                ratings[o.review.rate - 1]++;
                totRatingsCount++
            }
        })
        ratings.map((r,i) => {
            totRatings += (r * (i +1))
        })
        itemRating = parseFloat((totRatings/totRatingsCount).toFixed(1));

        console.log('ratings',ratings);
        console.log('totRatings',totRatings);
        console.log('totRatingsCount',totRatingsCount);
        console.log('---', itemRating);

        await Item.findByIdAndUpdate(order.itemId, {$set: {rating: itemRating}});
        return Order.findByIdAndUpdate(order._id, {$set: order});
    }

    getOrders(userId){
        return Order.find({userId: userId});
    }

    getReviewsByItemId(itemId){
        return Order.find({itemId: itemId}).then(orders => {
            let reviews = [];
            orders.map(order =>{
                if(order.review) reviews.push(order.review);
            })
            return reviews;
        }).catch(err => {return err});
    }
}

module.exports = new OrderItemController();
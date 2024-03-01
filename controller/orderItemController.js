const OrderItem = require('../models/orderItemModel')

class OrderItemController {
    getReviewsByItemId(itemId){
        return OrderItem.find({ itemId: itemId, isReviewed: true}, {review: true});
    }
}

module.exports = new OrderItemController();
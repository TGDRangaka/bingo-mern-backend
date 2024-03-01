const express = require('express');
const OrderItem = require('../controller/orderItemController');
const router = express.Router();

router.get('/reviews/:itemId', (req, res) => {
    OrderItem.getReviewsByItemId(req.params.itemId).then(data => res.status(200).json({data: data}))
 .catch(err => res.status(500).json({err: err}))
})

module.exports = router;
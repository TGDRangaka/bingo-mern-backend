const express = require('express');
const Order = require('../controller/orderController');
const router = express.Router();

router.post('/:cartOrItem', (req, res) => {
    Order.saveOrder(req.params.cartOrItem, req.body)
    .then(data => res.status(200).json({data: data}))
    .catch(err => {
        res.status(500).json({err: err})
    })
})

router.get('/:userId', (req, res) => {
    Order.getOrders(req.params.userId).then(data => res.status(200).json({data: data}))
    .catch(err => {
        res.status(500).json({err: err})
    })
});

router.get('/reviews/:itemId', (req, res) => {
    Order.getReviewsByItemId(req.params.itemId).then(data => res.status(200).json({data: data}))
    .catch(err => {
        console.log(err);
        res.status(500).json({err: err})
    })
});

router.put('/', (req, res) => {
    Order.updateOrder(req.body).then(data => res.status(200).json({data: data}))
   .catch(err => console.log(err));
})

router.put('/review', (req, res) => {
    Order.saveReview(req.body).then(data => res.status(200).json({data: data}))
   .catch(err => console.log(err));
})

module.exports = router;
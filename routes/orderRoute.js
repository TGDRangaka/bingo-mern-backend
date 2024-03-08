const express = require('express');
const Order = require('../controller/orderController');
const router = express.Router();

router.post('/:cartOrItem', (req, res) => {
    Order.saveOrder(req.params.cartOrItem, req.body)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({err: err}))
})

module.exports = router;
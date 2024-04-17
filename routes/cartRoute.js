var express = require('express');
var router = express.Router();
const Cart = require('../controller/cartController');

router.get('/', (req, res) => {
    Cart.getAll().then(data => res.status(200).json({data: data}))
 .catch(err => res.status(500).json({err: err}))
});

router.get('/:id', (req, res) => {
    Cart.getCart(req.params.id).then(data => res.status(200).json({data: data}))
.catch(err => res.status(500).json({err: err}))
});

router.post('/', (req, res) => {
    Cart.save(req.body).then(data => res.status(200).json({succses: true, data: data}))
.catch(err => res.status(500).json({err: err}))
});

router.put('/add/:id', (req, res) => {
    Cart.addItemToCart(req.params.id, req.body).then(data => res.status(200).json({data: data}))
.catch(err => res.status(500).json({err: err}))
});

router.put('/items/:cartId', (req, res) => {
    Cart.updateCartItems(req.params.cartId, req.body).then(data => res.status(200).json({data: data}))
 .catch(err => res.status(500).json({err: err}))
})

router.delete('/:cartId/:itemId', (req, res) => {
    Cart.deleteItem(req.params.cartId, req.params.itemId).then(data => res.status(200).json({succses: true}))
    .catch(err => res.status(500).json({err: err}));
})

module.exports = router;
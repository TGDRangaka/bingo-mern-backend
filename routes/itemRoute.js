const express = require('express');
const router = express.Router();
const Item = require('../controller/itemController');

router.get('/all', (req, res) => {
    Item.getAll().then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({err: err}))
})

router.get('/discounts', (req, res) => {
  Item.getDiscounts().then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({err: err}))
})

router.get('/:id', (req, res) => {
    Item.getItem(req.params.id).then(data => res.status(200).json({data: data}))
  .catch(err => res.status(500).json({err: err}))
})

router.post('/', (req, res) => {
    Item.save(req.body).then(data => res.status(200).json({succses: true, data: data}))
  .catch(err => res.status(500).json({err: err}))
})

module.exports = router;
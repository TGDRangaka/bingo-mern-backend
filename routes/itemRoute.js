const express = require('express');
const router = express.Router();
const Item = require('../controller/itemController');

router.get('/', (req, res) => {
    Item.getAll().then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({err: err}))
})

router.post('/', (req, res) => {
    Item.save(req.body).then(data => res.status(200).json({succses: true, data: data}))
  .catch(err => res.status(500).json({err: err}))
})

module.exports = router;
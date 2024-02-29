var express = require('express');
var router = express.Router();
const Store = require('../controller/storeController');

router.get('/', (req, res) =>{
    Store.getAll().then(data => res.status(200).json({data: data}))
 .catch(err => res.status(500).json({err: err}))
})

router.get('/:id', (req, res) => {
    Store.getStoreByUser(req.params.id).then(data => res.status(200).json({data: data}))
.catch(err => res.status(500).json({err: err}))
})

router.post('/', (req, res) => {
    Store.save(req.body).then(data => res.status(200).json({succses: true, data: data}))
.catch(err => res.status(500).json({err: err}))
})

module.exports = router;
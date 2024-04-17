const express = require('express');
const router = express.Router();
const Item = require('../controller/itemController');
const multer = require('multer');

router.get('/all', (req, res) => {
    Item.getAll()
    .then(data => {res.status(200).json({data: data})})
    .catch(err => res.status(500).json({err: err}))
})

router.get('/discounts', (req, res) => {
  Item.getDiscounts()
  .then(data => res.status(200).json({data: data}))
  .catch(err => res.status(500).json({err: err}))
})

router.get('/category/:category', (req, res) => {
  Item.getByCategory(req.params.category)
  .then(data => res.status(200).json({data: data}))
  .catch(err => res.status(500).json({err: err}))
})

router.get('/:id', (req, res) => {
  Item.getItem(req.params.id)
  .then(data => res.status(200).json({data: data}))
  .catch(err => res.status(500).json({err: err}))
})

router.get('/store/:storeId', (req, res) => {
  Item.getStoreItems(req.params.storeId)
  .then(data => res.status(200).json({data: data}))
  .catch(err => res.status(500).json({err: err}))
})

router.get('/search/:keyword', (req, res) => {
  Item.getByName(req.params.keyword)
  .then(data => res.status(200).json({data: data}))
  .catch(err => res.status(500).json({err: err}))
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'assets/images/')
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, 'item_' + uniqueSuffix + '.png')
  }
})
const upload = multer({ storage: storage })

router.post('/', upload.single('image'), async (req, res) => {
  Item.save(req.body, req.file).then(data => res.status(200).json({succses: true, data: data}))
.catch(err => res.status(500).json({err: err}))
});

router.put('/:itemId', upload.single('image'), async (req, res) => {
  Item.update(req.params.itemId, req.body, req.file).then(data => res.status(200).json({succses: true, data: data}))
.catch(err => res.status(500).json({err: err}))
});

router.put('/active/:itemId', (req, res) => {
    Item.setItemActive(req.params.itemId)
    .then(data => res.status(200).json({succses: true, data: data}))
    .catch(err => res.status(500).json({err: err}))
})

router.put('/active/all/true', (req, res) => {
  Item.setItemsActiveAll()
  .then(data => res.status(200).json({succses: true, data: data}))
  .catch(err => res.status(500).json({err: err}))
})

router.delete('/:itemId', (req, res) => {
  Item.delete(req.params.itemId)
  .then(data => res.status(200).json({succses: true}))
  .catch(err => res.status(500).json({err: err}))
})

module.exports = router;
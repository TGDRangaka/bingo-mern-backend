const express = require('express');
const router = express.Router();
const Item = require('../controller/itemController');
const multer = require('multer');

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'assets/images/')
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })

router.post('/', upload.single('image'), async (req, res) => {
  Item.save(req.body, req.file).then(data => res.status(200).json({succses: true, data: data}))
.catch(err => res.status(500).json({err: err}))
});

router.put('/', (req, res) => {
    Item.setItemsActive().then(data => res.status(200).json({succses: true, data: data}))
.catch(err => res.status(500).json({err: err}))
})

module.exports = router;
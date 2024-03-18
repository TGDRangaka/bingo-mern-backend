var express = require('express');
var router = express.Router();
const Store = require('../controller/storeController');
const multer = require('multer');

router.get('/', (req, res) =>{
    Store.getAll().then(data => res.status(200).json({data: data}))
 .catch(err => res.status(500).json({err: err}))
})

router.get('/:id', (req, res) => {
    Store.getStoreByUser(req.params.id).then(data => res.status(200).json({data: data}))
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
    console.log(req.body);
    console.log(req.file.destination + req.file.filename);

    Store.save(req.body, req.file).then(data => res.status(200).json({succses: true, data: data}))
.catch(err => res.status(500).json({err: err}))
})

module.exports = router;
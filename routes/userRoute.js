
var express = require('express');
var router = express.Router();
const User = require('../controller/userController');

/* GET users listing. */
router.get('/', function(req, res) {
  User.getAll()
  .then(result => {
    res.status(200).json({ data: result})
  })
  .catch(err => res.status(500).json({ data: err}));
});

router.post('/', function(req, res) {
  User.save(req.body).then(result => res.status(200).json({ succses: true, _id: result._id}))
  .catch(err => res.status(500).json({succses:false, err: err}))
})

module.exports = router;

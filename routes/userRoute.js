
var express = require('express');
var router = express.Router();
const User = require('../controller/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.getAll()
  .then(result => {
    res.status(200).json({ data: result})
  })
  .catch(err => res.status(500).json({ data: err}));
});

module.exports = router;

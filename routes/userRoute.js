
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
  User.save(req.body).then(result => res.status(200).json({ succses: true, data: result}))
  .catch(err => res.status(500).json({succses:false, err: err}))
})

router.put('/:id', function(req, res) {
  User.update(req.params.id, req.body).then(result => res.status(200).json({ succses: true, _id: result._id}))
.catch(err => res.status(500).json({succses:false, err: err}))
})

router.delete('/:id', function(req, res) {
  User.delete(req.params.id).then(result => res.status(200).json({ succses: true}))
.catch(err => res.status(500).json({succses:false, err: err}))
})

router.get('/:username/:password', (req, res) => {
  User.checkValidity(req.params.username, req.params.password).
  then(result => {
    result ? 
    res.status(200).json({ succses: true, data: result})
    : res.status(200).json({ succses: false})
  })
  .catch(err => res.status(500).json({succses: false}))
})



module.exports = router;

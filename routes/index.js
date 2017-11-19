import express from 'express'
// 子路由
// import login from './login'
import data from './data'
import product from './product'

const router = express.Router();

router.route('/')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });

// router.use('/login', login)
router.use('/data', data)
router.use('/product', product)
  
module.exports = router;
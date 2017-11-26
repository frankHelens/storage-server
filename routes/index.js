import express from 'express'
// 子路由
// import login from './login'
import product from './product'
import relation from './relation'
import enterStock from './enterStock'

const router = express.Router();

router.route('/')
  .get(function(req, res) {
    res.send('author: frank');
  })
// router.use('/login', login)

router.use('/relation', relation)

router.use('/product', product)
router.use('/enterStock', enterStock)
  
module.exports = router;
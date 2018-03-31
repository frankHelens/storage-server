import express from 'express'
// 子路由
import product from './product'
import relation from './relation'
import enterStock from './enterStock'
import deliveryStock from './deliveryStock'
import users from './users'
import test from './test'
import changePassword from './changePassword'
import menu from './menu'
import rbac from './rbac'

export const router = express.Router();

router.route('/')
  .get(function(req, res) {
    res.send('author: frank');
  })

router.use('/relation', relation)
router.use('/product', product)
router.use('/enterStock', enterStock)
router.use('/deliveryStock', deliveryStock)
router.use('/user', users)
router.use('/changePassword', changePassword)
router.use('/menu', menu)
router.use('/test', test)
router.use('/rbac', rbac)

module.exports = router;

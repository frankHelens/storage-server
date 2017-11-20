import express from 'express'
//引入数据库Message模块
import Product from '../Model/product'
// 引入处理数据的api
import { fetchCreate, fetchList } from '../utils/api'

const router = express.Router();

router.route('/')
  .get((req, res) => {
    fetchList({
      model: Product
    })
    .then((data) => {
      res.send(data)
    })
  })
  .post((req, res) => {
    fetchCreate({
      model: Product,
      data: {
        name: 'aaa',
        type: 'bbb',
        unit: 'ccc',
        productNum: 100,
        storeNum: 100,
        totalNum: 200,
        price: 200.00,
        newPrice: 300.22,
        remark: 'i1231'
      }
    })
    .then((data) => {
      res.send(data)
    })
  })
  .put((req, res) => {
    res.send('put-login');
  });
  
module.exports = router;
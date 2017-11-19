import express from 'express'
//引入数据库Product模块
import Product from '../Model/product'
// 引入处理数据的api
import { fetchList, fetchCreate, fetchUpdate, fetchDelete } from '../utils/api'

const router = express.Router();

router.route('/')
  .get((req, res) => {
    fetchList({
      model: Product,
      data: req.query
    })
    .then((data) => {
      res.send(data)
    })
  })
  .post((req, res) => {
    fetchCreate({
      model: Product,
      data: req.body
    })
    .then((data) => {
      res.send(data)
    })
  })

router.route('/:id')
  .put((req, res) => {
    fetchUpdate({
      model: Product,
      id: req.params.id,
      data: req.body
    })
    .then((data) => {
      res.send(data)
    })
  })
  .delete((req, res) => {
    fetchDelete({
      model: Product,
      id: req.params.id
    })
    .then((data) => {
      res.send(data)
    })
  })
module.exports = router;
import express from 'express'
//引入数据库Product模块
import { Product } from '../Model'
// 引入处理数据的api
import { fetchList, fetchCreate, fetchUpdate, fetchDelete, fetchBatchDelete, fetch } from '../utils/api'
import sequelize from '../DB/config'

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
  .delete((req, res) => {
    fetchBatchDelete({
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

router.route('/safe')
  .get((req, res) => {
    sequelize.query('SELECT * FROM products WHERE productNum < safeNum', { model: Product }).then(function (product) {
      res.send({
        code: 0,
        data: {
          data: product,
          recordsFiltered: product.length,
          recordsTotal: product.length
        },
        message: ''
      })
    })
  })
module.exports = router;

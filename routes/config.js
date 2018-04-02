import express from 'express'
//引入数据库Config模块
import { Config } from '../Model'
// 引入处理数据的api
import { fetchList, fetchCreate, fetchUpdate, fetchBatchDelete } from '../utils/api'

const router = express.Router();

router.route('/')
  .get((req, res) => {
    fetchList({
      model: Config,
      data: req.query
    })
    .then((data) => {
      res.send(data)
    })
  })
  .post((req, res) => {
    fetchCreate({
      model: Config,
      data: req.body
    })
    .then((data) => {
      res.send(data)
    })
  })
  .delete((req, res) => {
    fetchBatchDelete({
      model: Config,
      data: req.body
    })
    .then((data) => {
      res.send(data)
    })
  })

router.route('/:id')
  .put((req, res) => {
    fetchUpdate({
      model: Config,
      id: req.params.id,
      data: req.body
    })
    .then((data) => {
      res.send(data)
    })
  })

module.exports = router;

import express from 'express'
//引入数据库User模块
import { User } from '../Model'
// 引入处理数据的api
import { fetchList, fetchCreate, fetchUpdate, fetchBatchDelete } from '../utils/api'

const router = express.Router();

router.route('/')
  .get((req, res) => {
    fetchList({
      model: User,
      data: req.query
    })
    .then((data) => {
      res.send(data)
    })
  })
  .post((req, res) => {
    fetchCreate({
      model: User,
      data: req.body
    })
    .then((data) => {
      res.send(data)
    })
  })
  .delete((req, res) => {
    fetchBatchDelete({
      model: User,
      data: req.body
    })
    .then((data) => {
      res.send(data)
    })
  })

router.route('/:id')
  .put((req, res) => {
    fetchUpdate({
      model: User,
      id: req.params.id,
      data: req.body
    })
    .then((data) => {
      res.send(data)
    })
  })

router.route('/get')
  .get((req, res) => {
    const { userId, loginName } = req.decode
    res.send({
      code: 0,
      data: req.decode,
      message: ''
    })
  })

module.exports = router;

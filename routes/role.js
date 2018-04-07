import express from 'express'
//引入数据库Role模块
import { Role } from '../Model'
// 引入处理数据的api
import { fetchList, fetchCreate, fetchUpdate, fetchBatchDelete } from '../utils/api'

const router = express.Router();

const joinMenu = (menu) => {
  return menu.join(',')
}
const splitMenu = (menu) => {
  return menu.split(',')
}

router.route('/')
  .get((req, res) => {
    fetchList({
      model: Role,
      data: req.query
    })
    .then((data) => {
      data.data.data.map(item => {
        item.menuIds = splitMenu(item.menuIds)
        return item
      })
      res.send(data)
    })
  })
  .post((req, res) => {
    req.body.menuIds = joinMenu(req.body.menuIds)
    fetchCreate({
      model: Role,
      data: req.body
    })
    .then((data) => {
      res.send(data)
    })
  })
  .delete((req, res) => {
    fetchBatchDelete({
      model: Role,
      data: req.body
    })
    .then((data) => {
      res.send(data)
    })
  })

router.route('/:id')
  .put((req, res) => {
    req.body.menuIds = joinMenu(req.body.menuIds)
    fetchUpdate({
      model: Role,
      id: req.params.id,
      data: req.body
    })
    .then((data) => {
      res.send(data)
    })
  })

module.exports = router;

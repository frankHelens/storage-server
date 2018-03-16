import express from 'express'

// 业务处理
import { enterStockCreate, getEnterStockDetail, putEnterStockDetail } from '../../Controller/enterStore'

const router = express.Router()

router.route('/')
  .post((req, res) => {
    enterStockCreate(req.body)
    .then((data) => {
      res.send(data)
    })
  })

router.route('/:id')
  .get((req, res) => {
    getEnterStockDetail(req.params.id)
    .then((data) => {
      res.send(data)
    })
  })
  .put((req, res) => {
    putEnterStockDetail({
      id: req.params.id,
      data: req.body
    })
    .then((data) => {
      res.send(data)
    })
  })

module.exports = router

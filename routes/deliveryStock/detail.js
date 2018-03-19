import express from 'express'

// 业务处理
import { deliveryStockCreate, getDeliveryStockDetail, putDeliveryStockDetail } from '../../Controller/enterStore'

const router = express.Router()

router.route('/')
  .post((req, res) => {
    deliveryStockCreate(req.body)
    .then((data) => {
      res.send(data)
    })
  })

router.route('/:id')
  .get((req, res) => {
    getDeliveryStockDetail(req.params.id)
    .then((data) => {
      res.send(data)
    })
  })
  .put((req, res) => {
    putDeliveryStockDetail({
      id: req.params.id,
      data: req.body
    })
    .then((data) => {
      res.send(data)
    })
  })

module.exports = router

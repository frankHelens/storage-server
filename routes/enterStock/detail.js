import express from 'express'

// 业务处理
import { enterStoreCreate, getEnterStoreDetail } from '../../Controller/enterStore'

const router = express.Router()

router.route('/')
  .post((req, res) => {
    enterStoreCreate(req.body)
    .then((data) => {
      res.send(data)
    })
  })

router.route('/:id')
  .get((req, res) => {
    getEnterStoreDetail(req.params.id)
    .then((data) => {
      res.send(data)
    })
  })

module.exports = router

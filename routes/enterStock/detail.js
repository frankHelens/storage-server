import express from 'express'
import EnterStock from '../../Model/enterStock'

import { detailPost } from '../../Controller/enterStore'
import { fetchCreate } from '../../utils/api'

const router = express.Router()

router.route('/')
  .get((req, res) => {
    const test = {
      base: {
        createdAt: 1511704749000,
        origin: 'aslfadslkfj',
        storageType: 'storage',
        enterPrice: 500.00,
        takePe: '黄小大',
        makePe: '黄大小',
        remark: '我是备注'
      },
      data: []
    }
    fetchCreate({
      model: EnterStock,
      data: detailPost(test)
    })
    .then(data => {
      res.send(data)
    })
  })

module.exports = router


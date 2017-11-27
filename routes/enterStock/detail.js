import express from 'express'
import EnterStock from '../../Model/enterStock'
import EnterStockDetail from '../../Model/enterStockDetail'

import { detailPost } from '../../Controller/enterStore'
import { fetchCreate, fetchBatchCreate } from '../../utils/api'

const router = express.Router()

router.route('/')
  .get((req, res) => {
    const test = {
      base: {
        createdAt: 1511704749000,
        origin: 'asdfadfall',
        storageType: 'storage',
        enterPrice: 500.00,
        takePe: '黄小大',
        makePe: '黄大小',
        remark: '我是备注'
      },
      data: [{
        productId: 100,
        stockNum: 200
      }]
    }
    fetchCreate({
      model: EnterStock,
      data: detailPost(test)
    })
    .then(baseRes => {
      if (baseRes.code === 0) {
        createData(test)
      } else {
        res.send(baseRes)
      }
      // res.send(data)
    })
  })

function createData (test) {
  const data = test.data
  fetchBatchCreate({
    model: EnterStockDetail,
    data: data
  })
}

module.exports = router


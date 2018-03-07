import express from 'express'

// 业务处理
import { enterStoreCreate } from '../../Controller/enterStore'

const router = express.Router()

router.route('/')
  .get((req, res) => {
    // const test = {
    //   base: {
    //     createdAt: 1511704749000,
    //     origin: 'asdfadfall',
    //     storageType: 'storage',
    //     enterPrice: 500.00,
    //     takePe: '黄小大',
    //     makePe: '黄大小',
    //     remark: '我是备注'
    //   },
    //   tableData: [{
    //     productId: 100,
    //     enterNum: 200,
    //     discount: 100,
    //     remark: '这个是单个的商品价格1'
    //   }, {
    //     productId: 200,
    //     enterNum: 2,
    //     discount: 100,
    //     remark: '这个是单个的商品价格2'
    //   }, {
    //     productId: 300,
    //     enterNum: 3,
    //     discount: 100,
    //     remark: '这个是单个的商品价格3'
    //   }]
    // }
  })
  .post((req, res) => {
    enterStoreCreate(req.body)
    .then((data) => {
      res.send(data)
    })
  })

module.exports = router

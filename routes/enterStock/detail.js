import express from 'express'
// import EnterStock from '../../Model/enterStock'
// import EnterStockDetail from '../../Model/enterStockDetail'

// import { codeCreate } from '../../Controller/enterStore'
import { enterStoreCreate } from '../../Controller/enterStore'
// import { fetchCreate, fetchBatchCreate } from '../../utils/api'

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
      tableData: [{
        productId: 100,
        enterNum: 200,
        discount: 100,
        remark: '这个是单个的商品价格1'
      }, {
        productId: 200,
        enterNum: 2,
        discount: 100,
        remark: '这个是单个的商品价格2'
      }, {
        productId: 300,
        enterNum: 3,
        discount: 100,
        remark: '这个是单个的商品价格3'
      }]
    }
    // todo
    enterStoreCreate(test)
    .then((data) => {
      res.send(data)
    })
    // codeCreate()
    // .then((code) => {
    //   let { base, data } = test
    //   base.code = code
    //   data.map(item => {
    //     item.code = code
    //     return item
    //   })
    //   return test
    // })
    // .then((test) => {
    //   setProducts(test.data, res)
    //   .then(() => {
    //     setBaseData(test.base, res)
    //   })
    // })
  })

// const setProducts = (data, res) => {
//   return fetchBatchCreate({
//     model: EnterStockDetail,
//     data: data
//   })
//   .then(resData => {
//     if (resData.code === 0) {
//       return resData
//     } else {
//       res.send(resData)
//     }
//   })
// }

// const setBaseData = (data, res) => {
//   fetchCreate({
//     model: EnterStock,
//     data: data
//   })
//   .then(resMsg => {
//     res.send(resMsg)
//   })
// }


module.exports = router

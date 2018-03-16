import express from 'express'

import { EnterStock, EnterStockDetail, Product } from '../Model'
import { enterStoreCreate, getEnterStoreDetail } from '../Controller/enterStore';

const router = express.Router();

router.route('/')
.get((req, res) => {
  EnterStock.findAll({
    include: {
      model: EnterStockDetail
    },
    where: {
      id: 1
    }
  })
  .then((data) => {
    const resData = data.filter(item => item.enter_stock_detail)
    res.send(resData) 
    // EnterStockDetail.destroy({
    //   where: {
    //     id: data.map(item => item.enter_stock_detail.id)
    //   }
    // })
    // .then(data => {
    //   res.send('删除成功')
    // })
  })
})

module.exports = router;

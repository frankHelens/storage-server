import express from 'express'
import sequelize from '../DB/config'
import { EnterStock, EnterStockDetail, Product } from '../Model'
import { enterStoreCreate, getEnterStoreDetail } from '../Controller/enterStore';

const router = express.Router();

const arr = [6, 7, 8, 9]

router.route('/')
.get((req, res) => {
  return sequelize.transaction((t) => {
    return arr.map(item => {
      return Product.update({
        productNum: 30
      }, {
        where: {
          id: item
        }
      }, {transaction: t})
    })
  })
  .then((result) => {
    res.send(result)
  })
  .catch((error) => {
    console.log(error)
    // res.send(result)
  })
})

module.exports = router;

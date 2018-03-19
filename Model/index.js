import Dictionaries from './dictionaries'
import EnterStock from './enterStock'
import EnterStockDetail from './enterStockDetail'
import Product from './product'

EnterStockDetail.belongsTo(Product)
EnterStock.hasOne(EnterStockDetail)

module.exports = {
  Dictionaries,
  EnterStock,
  EnterStockDetail,
  Product
}

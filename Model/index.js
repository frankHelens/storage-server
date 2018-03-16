import Dictionaries from './dictionaries'
import EnterStock from './enterStock'
import EnterStockDetail from './enterStockDetail'
import Product from './product'
import Sequelize from 'sequelize' // ORM

EnterStockDetail.belongsTo(Product)
EnterStock.hasOne(EnterStockDetail)
EnterStock.hasMany(EnterStockDetail)

Sequelize.sync

module.exports = {
  Dictionaries,
  EnterStock,
  EnterStockDetail,
  Product
}

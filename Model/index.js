import Dictionaries from './dictionaries'
import EnterStock from './enterStock'
import EnterStockDetail from './enterStockDetail'
import Product from './product'
import DeliveryStock from './deliveryStock'
import DeliveryStockDetail from './deliveryStockDetail'
import User from './user'
import Menu from './menu'
import Role from './role'
import Config from './config'
import RoleMenu from './roleMenu'

EnterStockDetail.belongsTo(Product)
EnterStock.hasOne(EnterStockDetail)
DeliveryStockDetail.belongsTo(Product)
DeliveryStock.hasOne(DeliveryStockDetail)

module.exports = {
  User,  
  Dictionaries,
  EnterStock,
  EnterStockDetail,
  Product,
  DeliveryStock,
  DeliveryStockDetail,
  Menu,
  Role,
  Config,
  RoleMenu
}

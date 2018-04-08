import Sequelize from 'sequelize' // ORM
import schema from '../DB/config' // 数据库配置

//定义表的模型
const DeliveryStock = schema.define('delivery_stock', {
  id: { //自增长id,主键,整形
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: Sequelize.STRING(255),
    defaultValue: ''
  },
  clientName: {
    type: Sequelize.STRING(255),
    defaultValue: ''
  },
  storageType: {
    type: Sequelize.STRING(255),
    defaultValue: ''
  },
  deliveryPrice: {
    type: Sequelize.FLOAT(3),
    validate: {
      isNumeric: true // 只能使用数字
    },
    defaultValue: 0
  },
  clientAddress: { // 发货地址
    type: Sequelize.STRING(255),
    defaultValue: ''
  },
  linkMan: { // 联系人
    type: Sequelize.STRING(50),
    defaultValue: ''
  },
  linkPhone: { // 电话
    type: Sequelize.STRING(32),
    defaultValue: ''
  },
  makePe: { // 制单人
    type: Sequelize.STRING(255),
    defaultValue: ''
  },
  remark: {
    type: Sequelize.STRING(255),
    defaultValue: ''
  }
});

// DeliveryStock.drop();
// DeliveryStock.sync();

module.exports = DeliveryStock;

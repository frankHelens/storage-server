import Sequelize from 'sequelize' // ORM
import schema from '../DB/config' // 数据库配置

//定义表的模型
const EnterStock = schema.define('enter_stock', {
  id: { //自增长id,主键,整形
    type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  code: {
    type: Sequelize.STRING(15),
    defaultValue: ''
  },
  origin: {
    type: Sequelize.STRING(50),
    defaultValue: ''
  },
  storageType: {
    type: Sequelize.STRING(12),
    defaultValue: ''
  },
  enterPrice: {
    type: Sequelize.FLOAT(3),
    validate: {
      isNumeric: true // 只能使用数字
    }
  },
  takePe: {
    type: Sequelize.STRING(255),
    defaultValue: ''
  },
  makePe: {
    type: Sequelize.STRING(255),
    defaultValue: ''
  },
  remark: {
    type: Sequelize.STRING(255),
    defaultValue: ''
  }
});

// EnterStock.drop();
// EnterStock.sync();

module.exports = EnterStock;

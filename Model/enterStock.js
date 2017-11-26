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
    type: Sequelize.STRING(255)
  },
  origin: {
    type: Sequelize.STRING(255)
  },
  storageType: {
    type: Sequelize.STRING(255)
  },
  enterPrice: {
    type: Sequelize.FLOAT(3),
    validate: {
      isNumeric: true // 只能使用数字
    }
  },
  takePe: {
    type: Sequelize.STRING(255)
  },
  makePe: {
    type: Sequelize.STRING(255)
  },
  remark: {
    type: Sequelize.STRING(255)
  }
  // createdAt: Sequelize.BIGINT,
  // updatedAt: Sequelize.BIGINT,
  // version: Sequelize.BIGINT  
// }, {
//   timestamps: false
});
// EnterStock.drop(); //删除表
// EnterStock.sync(); //创建表

module.exports = EnterStock;

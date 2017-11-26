import Sequelize from 'sequelize' // ORM
import schema from '../DB/config' // 数据库配置

//定义表的模型
const Out = schema.define('product_out', {
  id: { //自增长id,主键,整形
    type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  code: {
    type: Sequelize.STRING(255)
  },
  name: {
    type: Sequelize.STRING(255)
  },
  type: {
    type: Sequelize.STRING(255)
  },
  unit: {
    type: Sequelize.STRING(50)
  },
  safeNum: {
    type: Sequelize.INTEGER(255)
  },
  OutNum: {
    type: Sequelize.INTEGER(255)
  },
  storeNum: {
    type: Sequelize.INTEGER(255)
  },
  totalNum: {
    type: Sequelize.INTEGER(255)
  },
  price: {
    type: Sequelize.FLOAT(3)
  },
  newPrice: {
    type: Sequelize.FLOAT(3)
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
// Out.drop(); //删除表
Out.sync(); //创建表

module.exports = Out;

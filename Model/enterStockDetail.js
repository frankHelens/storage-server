import Sequelize from 'sequelize' // ORM
import schema from '../DB/config' // 数据库配置

//定义表的模型
const EnterStockDetail = schema.define('enter_stock_detail', {
  id: { //自增长id,主键,整形
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  productId: {
    type: Sequelize.INTEGER,
    validate: {
      isNumeric: true
    }
  },
  enterNum: {
    type: Sequelize.INTEGER,
    validate: {
      isNumeric: true
    }
  },
  discount: {
    type: Sequelize.Sequelize.FLOAT(3),
    validate: {
      isNumeric: true
    }
  },
  remark: {
    type: Sequelize.STRING(255)
  }
});
EnterStockDetail.sync(); //创建表

module.exports = EnterStockDetail;

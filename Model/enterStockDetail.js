import Sequelize from 'sequelize' // ORM
import schema from '../DB/config' // 数据库配置

//定义表的模型
const EnterStockDetail = schema.define('enter_stock_detail', {
  id: { //自增长id,主键,整形
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  code: { // 编号
    type: Sequelize.STRING(255)
  },
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'products',
      key: 'id'
    },
    validate: {
      isNumeric: true
    }
  },
  enterStockId: {
    type: Sequelize.INTEGER
  },
  enterNum: {
    type: Sequelize.INTEGER,
    validate: {
      isNumeric: true
    }
  },
  productPrice: {
    type: Sequelize.FLOAT(3),
    validate: {
      isNumeric: true // 只能使用数字
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

// EnterStockDetail.drop();
EnterStockDetail.sync();

module.exports = EnterStockDetail;

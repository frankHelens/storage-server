import Sequelize from 'sequelize' // ORM
import schema from '../DB/config' // 数据库配置

//定义表的模型
const EnterStockDetail = schema.define('enter_stock_detail', {
  id: { //自增长id,主键,整形
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  productId: { // 商品id
    type: Sequelize.INTEGER,
    references: {
      model: 'products',
      key: 'id'
    },
    validate: {
      isNumeric: true
    }
  },
  enterStockId: { // 入库单Id
    type: Sequelize.INTEGER
  },
  enterNum: { // 入库数量
    type: Sequelize.INTEGER,
    validate: {
      isNumeric: true
    }
  },
  productPrice: { // 入库金额
    type: Sequelize.FLOAT(3),
    validate: {
      isNumeric: true // 只能使用数字
    }
  },
  unitPrice: { // 单价
    type: Sequelize.FLOAT(3),
    validate: {
      isNumeric: true // 只能使用数字
    }
  },
  discount: { // 折扣率
    type: Sequelize.Sequelize.FLOAT(3),
    validate: {
      isNumeric: true
    }
  },
  remark: { // 备注
    type: Sequelize.STRING(255)
  }
});

// EnterStockDetail.drop();
// EnterStockDetail.sync();

module.exports = EnterStockDetail;

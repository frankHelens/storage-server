import Sequelize from 'sequelize' // ORM
import schema from '../DB/config' // 数据库配置

//定义表的模型
const Product = schema.define('product', {
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
    type: Sequelize.INTEGER(255),
    validate: {
      isNumeric: true, // 只能使用数字
      isInt: true // 只能是整数
    }
  },
  productNum: {
    type: Sequelize.INTEGER(255),
    validate: {
      isNumeric: true // 只能使用数字
    }
  },
  storeNum: {
    type: Sequelize.INTEGER(255),
    validate: {
      isNumeric: true // 只能使用数字
    }
  },
  totalNum: {
    type: Sequelize.INTEGER(255),
    validate: {
      isNumeric: true // 只能使用数字
    }
  },
  price: {
    type: Sequelize.FLOAT(3),
    validate: {
      isNumeric: true // 只能使用数字
    }
  },
  newPrice: {
    type: Sequelize.FLOAT(3),
    validate: {
      isNumeric: true // 只能使用数字
    }
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
// Product.drop(); //删除表
// Product.sync(); //创建表

module.exports = Product;

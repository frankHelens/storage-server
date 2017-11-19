import Sequelize from 'sequelize' // ORM
import schema from '../DB/config' // 数据库配置

//定义表的模型
const Dictionaries = schema.define('dictionaries', {
  id: { //自增长id,主键,整形
    type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  name: {
    type: Sequelize.STRING(255)
  },
  value: {
    type: Sequelize.STRING(255)
  },
  label: {
    type: Sequelize.STRING(255)
  },
  editable: {
    type: Sequelize.INTEGER(1)
  },
  sort: {
    type: Sequelize.INTEGER(5)
  }
});
// Product.drop(); //删除表
Dictionaries.sync(); //创建表

module.exports = Dictionaries;

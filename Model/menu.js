import Sequelize from 'sequelize' // ORM
import schema from '../DB/config' // 数据库配置

//定义表的模型
const Menu = schema.define('ac_menu', {
  id: { //自增长id,主键,整形
    type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  parentId: {
    type: Sequelize.INTEGER
  },
  label: {
    type: Sequelize.STRING(50)
  },
  url: {
    type: Sequelize.STRING(100)
  },
  icon: {
    type: Sequelize.STRING(24)
  },
  type: {
    type: Sequelize.STRING(24)
  },
  noMenu: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  remark: {
    type: Sequelize.STRING(255)
  },
  enabled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
});
// Menu.drop(); //删除表
Menu.sync(); //创建表

module.exports = Menu;
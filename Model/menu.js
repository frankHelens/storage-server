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
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  label: {
    type: Sequelize.STRING(50),
    defaultValue: ''
  },
  url: {
    type: Sequelize.STRING(100),
    defaultValue: ''
  },
  icon: {
    type: Sequelize.STRING(24),
    defaultValue: ''
  },
  type: {
    type: Sequelize.STRING(24),
    defaultValue: ''
  },
  noMenu: {
    type: Sequelize.STRING(1),
    // type: Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: '0'
  },
  remark: {
    type: Sequelize.STRING(255),
    defaultValue: ''
  },
  enabled: {
    type: Sequelize.STRING(1),
    defaultValue: '1'
    // type: Sequelize.BOOLEAN,
    // allowNull: false,
    // defaultValue: true
  }
});
// Menu.drop(); //删除表
// Menu.sync(); //创建表

module.exports = Menu;

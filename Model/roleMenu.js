import Sequelize from 'sequelize' // ORM
import schema from '../DB/config' // 数据库配置

//定义表的模型
const roleMenu = schema.define('ac_role_menu', {
  id: { //自增长id,主键,整形
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roleId: {
    type: Sequelize.INTEGER(5)
  },
  menuId: {
    type: Sequelize.INTEGER(5)
  }
});
// roleMenu.drop(); //删除表
roleMenu.sync(); //创建表

module.exports = roleMenu;

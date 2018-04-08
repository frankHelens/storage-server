import Sequelize from 'sequelize' // ORM
import schema from '../DB/config' // 数据库配置

//定义表的模型
const Role = schema.define('ac_role', {
  id: { //自增长id,主键,整形
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roleName: {
    type: Sequelize.STRING(50),
    defaultValue: ''
  },
  roleDesc: {
    type: Sequelize.STRING(100),
    defaultValue: ''
  },
  menuIds: {
    type: Sequelize.STRING(255),
    defaultValue: ''
  },
  enabled: {
    type: Sequelize.STRING(1),
    defaultValue: ''
  },
  updateUserId: {
    type: Sequelize.STRING(8),
    defaultValue: ''
  }
});
// Role.drop(); //删除表
// Role.sync(); //创建表

module.exports = Role;

import Sequelize from 'sequelize' // ORM
import schema from '../DB/config' // 数据库配置

//定义表的模型
const User = schema.define('ac_user', {
  id: { //自增长id,主键,整形
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orgId: {
    type: Sequelize.STRING(4),
    defaultValue: ''
  },
  loginName: {
    type: Sequelize.STRING(32),
    defaultValue: ''
  },
  jobNumber: {
    type: Sequelize.STRING(10),
    defaultValue: ''
  },
  name: {
    type: Sequelize.STRING(32),
    defaultValue: ''
  },
  loginPassword: {
    type: Sequelize.STRING(64),
    defaultValue: ''
  },
  roleIds: {
    type: Sequelize.INTEGER(8)
  },
  // isEnabled: {
  //   type: Sequelize.INTEGER(255),
  //   validate: {
  //     isNumeric: true // 只能使用数字
  //   }
  // },
  linkPhone: {
    type: Sequelize.INTEGER(20),
    validate: {
      isNumeric: true // 只能使用数字
    }
  },
  remark: {
    type: Sequelize.STRING(255),
    defaultValue: ''
  }
});
// User.drop(); //删除表
// User.sync(); //创建表

module.exports = User;

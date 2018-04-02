import Sequelize from 'sequelize' // ORM
import schema from '../DB/config' // 数据库配置

//定义表的模型
const Config = schema.define('sys_config', {
  id: { //自增长id,主键,整形
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  configName: {
    type: Sequelize.STRING(50)
  },
  configValue: {
    type: Sequelize.STRING(100)
  },
  configType: {
    type: Sequelize.STRING(10)
  },
  enabled: {
    type: Sequelize.STRING(1)
  }
});
// Config.drop(); //删除表
Config.sync(); //创建表

module.exports = Config;

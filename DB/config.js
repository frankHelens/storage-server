import Sequelize from 'sequelize' // ORM

/*
host: 连接的host（默认: localhost）
port: 连接端口
user: 用户名
password: 密码
database: 数据库名
tablePrefix: 数据表前缀
charset: 编码（默认: UTF8_GENERAL_CI）
timezone: 时区（默认: 'local'）
connectTimeout: 连接超时时间（默认: 10000）
connectionLimit: 最大连接数（默认: 10）
logSql: 控制台输出sql（默认: false）
*/

 // 数据库配置
const config = {
  host: 'localhost',
  user: 'root',
  password: 'frank123',
  database:'storage',
  port: 3306
}

 // 数据库初始化建立
const sequelize = new Sequelize(config.database, config.username, null, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 6,
    min: 0,
    idle: 30000
  }
})


module.exports = sequelize;

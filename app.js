import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import index from './routes/index' // 路由引入
import login from './routes/login'
import test from './routes/test'
import { decodeToken } from './utils/common'

import { resInfo } from './utils/infoRender'

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// 设置前端静态页面
app.use(express.static(path.join(__dirname, 'dist')));

// 设置请求头
// application/json  接口返回json数据
// charset=utf-8 解决json数据中中文乱码
app.use(function(request, response, next) {
    response.header("Content-Type", "application/json;charset=utf-8");
    // response.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
    next();
});

app.use('/login', login);
app.use('/test', test)
app.use('/*', function (req, res, next) {
  // 获取token
  const token = req.headers['frank-access-token']
  const { code, data } = decodeToken(token)
  if (req.url === '/login') {
    next();
  } else if (code === -1) {
    res.send({
      code: 401,
      data: {},
      message: '访问超时，请重新登录！'
    })
  } else {
    req.decode = data
    next();
  }
})
// 路由
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  err.message = "页面不存在!";
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  err.message = err.status === 500 ? "数据异常，请联系管理员！" : err.message
  // res.render('error');
  const error = resInfo(err.status, err.message)
  res.json(error);
});

module.exports = app;

import express from 'express'
//引入数据库Message模块
import Message from '../Model/login'

const router = express.Router();

router.route('/')
  .get((req, res) => {
    //查找所有留言
    Message.create({  
      username: 'frank',
      content: '老杨'
    });
    Message.findAll().then(function(msgs) {
      res.send({ messages: msgs });
    });
    // res.send('login');
  })
  .post((req, res) => {
    res.send('post-login');
  })
  .put((req, res) => {
    res.send('put-login');
  });
  
module.exports = router;
import express from 'express'
//引入数据库User模块
import { User, Menu } from '../Model'

import { Message } from '../utils/common'
// 引入处理数据的api

const router = express.Router();

router.route('/')
  .get((req, res) => {
    const { userId, realName } = req.decode    
    Menu.findAll().then((menus) => {
      res.send(Message(0, {
        menus,
        userId,
        realName
      }, ""))
    })
  })

module.exports = router;

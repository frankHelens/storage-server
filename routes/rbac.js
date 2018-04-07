import express from 'express'
//引入数据库User模块
import { User, Menu, Role } from '../Model'

import { Message } from '../utils/common'
// 引入处理数据的api

const router = express.Router();

router.route('/')
  .get((req, res) => {
    const { roleIds, userId, realName } = req.decode    
    Role.findOne({
      where: {
        id: roleIds
      }
    }).then((role) => {
      const menuIds = role.menuIds.split(',')
      console.log('role.menuIds', )
      Menu.findAll({
        where: {
          id: menuIds
        }
      })
      .then(menus => {
        res.send(Message(0, {
          menus,
          userId,
          realName
        }, ''))  
      })
    })
    // Menu.findAll().then((menus) => {
    //   res.send(Message(0, {
    //     menus,
    //     userId,
    //     realName
    //   }, ""))
    // })
  })

module.exports = router;

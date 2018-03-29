import express from 'express'
// //引入数据库Menu模块
import { Menu } from '../Model'
// // 引入处理数据的api
// import { fetchList, fetchCreate, fetchUpdate, fetchBatchDelete } from '../utils/api'

const router = express.Router();

router.route('/')
  .get((req, res) => {
    Menu.bulkCreate([{
      label: '系统管理',
      url: '',
      icon: 'gear-b',
      type: 'MODULE'
    }, {
      parentId: 0,
      label: '用户管理',
      url: '/system/account',
      icon: '',
      type: 'PAGE'
    }, {
      label: '基础信息',
      url: '',
      icon: 'document-text',
      type: 'MODULE'
    }, {
      parentId: 2,
      label: '商品列表',
      url: '/base/product',
      icon: 'document-text',
      type: 'MODULE'
    }, {
      label: '业务办理',
      url: '',
      icon: 'ios-compose',
      type: 'PAGE'
    }, {
      label: '入库管理',
      parentId: 4,
      url: '/manage/enterStock',
      icon: '',
      type: 'PAGE'
    }, {
      label: '入库单',
      parentId: 5,
      url: '/manage/enterStockDetail',
      icon: '',
      type: 'PAGE',
      noMenu: '1'
    }, {
      label: '入库单',
      parentId: 5,
      url: '/manage/enterStockDetail/:id',
      icon: '',
      type: 'PAGE',
      noMenu: '1'
    }, {
      label: '出库管理',
      parentId: 4,
      url: '/manage/deliveryStock',
      icon: '',
      type: 'PAGE'
    }, {
      label: '出库单',
      parentId: 8,
      url: '/manage/deliveryStockDetail',
      icon: '',
      type: 'PAGE',
      noMenu: '1'
    }, {
      label: '出库单',
      parentId: 8,
      url: '/manage/deliveryStockDetail/:id',
      icon: '',
      type: 'PAGE',
      noMenu: '1'
    }, {
      parentId: 0,
      label: '修改密码',
      url: '/system/changePassword',
      icon: '',
      type: 'PAGE',
      noMenu: '1'
    }, {
      parentId: 2,
      label: '安全库存列表',
      url: '/base/safeList',
      icon: 'document-text',
      type: 'PAGE',
      noMenu: '1'
    }])
    .then(data => {
      res.send(data)
    })
  })
module.exports = router;

import moment from 'moment'

import EnterStock from '../Model/enterStock'
import EnterStockDetail from '../Model/enterStockDetail'

import { fetchList, fetchCreate, fetchBatchCreate, fetch } from '../utils/api'

import { Message } from '../utils/common'

// 事务处理
export const enterStoreCreate = (data) => {
  return codeCreate()
  .then(({enterStockId, code}) => {
    let { base, tableData } = data
    base.code = code
    tableData.map(item => {
      item.code = code
      item.enterStockId = enterStockId
      return item
    })
    return data
  })
  .then((data) => {
    return setProducts(data.tableData)
    .then((productData) => {
      if (productData) {
        return setBaseData(data.base)
        .then((baseData) => {
          if (baseData) {
            return baseData
          }
        })
      }
    })
  })
}

// 生成单据编号跟入库列表的id
export const codeCreate = () => {
  return fetchList({
    model: EnterStock,
    data: {}
  })
  .then((res) => {
    const count = res.data.recordsTotal + 1
    return {
      enterStockId: count,
      code: 'JHD' + Number(moment().format('YYYYMMDD')) * 1000 + count
    }
  })
}

// 添加入库的信息到数据库
const setProducts = (data) => {
  return fetchBatchCreate({
    model: EnterStockDetail,
    data: data
  })
  .then(resData => {
    if (resData.code === 0) {
      return resData
    }
  })
}

// 添加订单基础信息到数据库
const setBaseData = (data) => {
  return fetchCreate({
    model: EnterStock,
    data: data
  })
  .then(resMsg => {
    if (resMsg.code === 0) {
      return resMsg
    }
  })
}

// 获取入仓单数据
export const getEnterStoreDetail = (id) => {
  let resData = {}
  return getEnterStore(id)
  .then((data) => {
    if (data) {
      resData.base = data
      return getEnterStoreDetailList(data.code)
      .then(detailData => {
        resData.tableData = detailData
        return Message(0, resData, '成功')
      })
    } else {
      return Message(400, null, '找不到对应资源')
    }
  })
}

// 查询入仓单
const getEnterStore = (id) => {
  return fetch({
    model: EnterStock,
    data: {
      id
    }
  })
  .then(data => {
    if (data.length) {
      return data[0]
    }
  })
}

// 查询入仓单列表
const getEnterStoreDetailList = (code) => {
  return fetch({
    model: EnterStockDetail,
    data: {
      code
    }
  })
  .then(data => {
    return data
  })
}

import moment from 'moment'

import EnterStock from '../Model/enterStock'
import EnterStockDetail from '../Model/enterStockDetail'

import { fetchList, fetchCreate, fetchBatchCreate } from '../utils/api'

// 事务处理
export const enterStoreCreate = (data) => {
  return codeCreate()
  .then((code) => {
    let { base, tableData } = data
    base.code = code
    tableData.map(item => {
      item.code = code
      return item
    })
    return data
  })
  .then((data) => {
    setProducts(data.tableData)
    .then((productData) => {
      if (productData) {
        setBaseData(data.base)
        .then((baseData) => {
          if (baseData) {
            return baseData
          }
        })
      }
    })
  })
}

// 生成单据编号
export const codeCreate = () => {
  return fetchList({
    model: EnterStock,
    data: {}
  })
  .then((res) => {
    const count = res.data.recordsTotal + 1
    return 'JHD' + Number(moment().format('YYYYMMDD')) * 1000 + count
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
  fetchCreate({
    model: EnterStock,
    data: data
  })
  .then(resMsg => {
    if (resMsg.code === 0) {
      return resMsg
    }
  })
}

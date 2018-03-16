import moment from 'moment'
import { EnterStock, EnterStockDetail, Product } from '../Model'
import { fetchList, fetchCreate, fetchBatchCreate, fetch, fetchUpdate } from '../utils/api'
import { Message } from '../utils/common'
// import { cloneDeep, omit } from 'lodash'

// 事务处理
export const enterStockCreate = (data) => {
  return codeCreate()
  .then(({enterStockId, code}) => {
    let { base, tableData } = data
    base.code = code
    tableData.map(item => {
      item.enterStockId = Number(enterStockId)
      return item
    })
    return data
  })
  .then((data) => {
    return createEnterStockDetail(data.tableData)
    .then((productData) => {
      if (productData) {
        return createBaseData(data.base)
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
const createEnterStockDetail = (data) => {
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
const createBaseData = (data) => {
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
export const getEnterStockDetail = (id) => {
  let resData = {}
  return EnterStock.findAll({
    include: {
      model: EnterStockDetail,
      include: [Product]
    },
    where: {
      id
    }
  })
  .then((data) => {
    if (data && data.length) {
      resData = {
        base: data[0],
        tableData: data.filter(item => item.enter_stock_detail).map(item => item.enter_stock_detail)
      }
      return Message(0, resData, '成功')
    } else {
      return Message(404, null, '找不到对应资源')
    }
  })
}

// 更新数据
export const putEnterStockDetail = ({ id, data }) => {
  const { base, tableData } = data
  const postData = tableData.map(item => {
    item.enterStockId = id
    return item
  })
  return EnterStock.findAll({
    include: {
      model: EnterStockDetail
    },
    where: {
      id
    }
  })
  .then((resData) => {
    // 判断是否为空数据
    const checkData = resData.filter(item => item.enter_stock_detail)
    if (checkData.length) {
      const ids = checkData.map(item => item.enter_stock_detail.id)
      return deleteEnterStockDetail(ids, postData)
    } else {
      return createEnterStockDetail(postData)
    }
  })
}

// 删除全部数据
const deleteEnterStockDetail = (ids, data) => {
  return EnterStockDetail.destroy({
    where: {
      id: ids
    }
  })
  .then(() => {
    // 更新数据
    return createEnterStockDetail(data)
  })
  .catch(err => {
    Message(-1, null, '更新数据失败！')
  })
}

// 更新
const updateEnterStock = ({ id, data }) => {
  return fetchUpdate({
    model: EnterStock,
    id,
    data
  })
  .then(res => {
    if (res.code === 0) {
      return res     
    } else {
      return Message(500, {}, null)
    }
  })
}

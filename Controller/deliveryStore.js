import moment from 'moment'
import { DeliveryStock, DeliveryStockDetail, Product } from '../Model'
import { fetchList, fetchCreate, fetchBatchCreate, fetch, fetchUpdate } from '../utils/api'
import { Message } from '../utils/common'
// import { cloneDeep, omit } from 'lodash'
import sequelize from '../DB/config'

// 事务处理
export const deliveryStockCreate = (data) => {
  return codeCreate()
  .then(({deliveryStockId, code}) => {
    let { base, tableData } = data
    base.code = code
    tableData.map(item => {
      item.deliveryStockId = Number(deliveryStockId)
      return item
    })
    return data
  })
  .then((data) => {
    return createDeliveryStockDetail(data.tableData)
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
    model: DeliveryStock,
    data: {}
  })
  .then((res) => {
    const count = res.data.recordsTotal + 1
    return {
      deliveryStockId: count,
      code: 'CHD' + Number(moment().format('YYYYMMDD')) * 1000 + count
    }
  })
}

// 添加入库的信息到数据库
const createDeliveryStockDetail = (data) => {
  return fetchBatchCreate({
    model: DeliveryStockDetail,
    data: data
  })
  .then(resData => {
    if (resData.code === 0) {
      return updateProducts(data)
    }
  })
}

// 添加订单基础信息到数据库
const createBaseData = (data) => {
  return fetchCreate({
    model: DeliveryStock,
    data: data
  })
  .then(resMsg => {
    if (resMsg.code === 0) {
      return resMsg
    }
  })
}

// 更新商品列表
const updateProducts = (data) => {
  // console.log(data)
  return sequelize.transaction((t) => {
    return data.map(item => {
      const { productId, deliveryNum, unitPrice } = item
      return Product.update({
        productNum: deliveryNum, // 修改入库数量
        newPrice: unitPrice
      }, {
        where: {
          id: productId
        }
      }, {transaction: t})
    })
  })
  .then((result) => {
    return Message(0, result, '修改成功！')
  })
  .catch((error) => {
    return Message(-1, error, '错误！')
  })
}


// 获取入仓单数据
export const getDeliveryStockDetail = (id) => {
  let resData = {}
  return DeliveryStock.findAll({
    include: {
      model: DeliveryStockDetail,
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
        tableData: data.filter(item => item.delivery_stock_detail).map(item => item.delivery_stock_detail)
      }
      return Message(0, resData, '成功')
    } else {
      return Message(404, null, '找不到对应资源')
    }
  })
}

// 更新数据
export const putDeliveryStockDetail = ({ id, data }) => {
  const { base, tableData } = data
  const postData = tableData.map(item => {
    item.deliveryStockId = id
    return item
  })
  return DeliveryStock.findAll({
    include: {
      model: DeliveryStockDetail
    },
    where: {
      id
    }
  })
  .then((resData) => {
    // 判断是否为空数据
    const checkData = resData.filter(item => item.delivery_stock_detail)
    if (checkData.length) {
      const ids = checkData.map(item => item.delivery_stock_detail.id)
      return deleteDeliveryStockDetail(ids, postData).then(res => {
        if (res) {
          return updateDeliveryStock({ base, id })
        } else {
          throw Message(-1, null, '更新失败！')
        }
      })
    } else {
      return createDeliveryStockDetail(postData).then(res => {
        if (res) {
          return updateDeliveryStock({ base, id })
        } else {
          throw Message(-1, null, '更新失败！')
        }
      })
    }
  })
  .catch((error) => {
    return error
  })
}

// 删除全部数据
const deleteDeliveryStockDetail = (ids, data) => {
  return DeliveryStockDetail.destroy({
    where: {
      id: ids
    }
  })
  .then(() => {
    // 更新数据
    return createDeliveryStockDetail(data)
  })
  .catch(err => {
    Message(-1, null, '更新数据失败！')
  })
}

// 更新
const updateDeliveryStock = ({ id, base }) => {
  return fetchUpdate({
    model: DeliveryStock,
    id,
    data: base
  })
  .then(res => {
    if (res.code === 0) {
      return res     
    } else {
      return Message(500, {}, null)
    }
  })
}

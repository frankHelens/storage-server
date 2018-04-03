import moment from 'moment'
import { EnterStock, EnterStockDetail, Product } from '../Model'
import { fetchList, fetchCreate, fetchBatchCreate, fetch, fetchUpdate } from '../utils/api'
import { Message } from '../utils/common'
import { keyBy } from 'lodash'
import sequelize from '../DB/config'

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

// 添加入库的信息到数据库
const createEnterStockDetail = (data) => {
  return fetchBatchCreate({
    model: EnterStockDetail,
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
    model: EnterStock,
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
  return sequelize.transaction((t) => {
    return data.map(item => {
      const { productId, enterNum, unitPrice } = item
      return Product.findById(productId).then(product => {
        return product.increment({
          productNum: enterNum
        })
      }, {transaction: t})
      // return Product.update({
      //   productNum: enterNum, // 修改入库数量
      //   newPrice: unitPrice
      // }, {
      //   where: {
      //     id: productId
      //   }
      // }, {transaction: t})
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

// 更新入库的信息到数据库
const updateEnterStockDetail = ({postData, dataDetail}) => {
  return fetchBatchCreate({
    model: EnterStockDetail,
    data: postData
  })
  .then(resData => {
    if (resData.code === 0) {
      // 更新商品数据的处理
      const newDataObj = keyBy(postData, 'productId')
      const oldDataObj = keyBy(dataDetail, 'productId')
      // 获取更新商品数量的处理
      const productData = postData.map(item => {
        const product = oldDataObj[item.productId]
        item.enterNum = product ? (item.enterNum - product.enterNum) : item.enterNum
        return item
      })
      // 获取去掉一整个商品的内容， 将数量减掉
      const residueData = dataDetail.filter(filterItem => !newDataObj[filterItem.productId]).map(item => {
        item.enterNum = 0 - item.enterNum
        return item
      })
      // 最终拼接成一块
      return updateProducts([...productData, ...residueData])
    }
  })
}

// 更新入仓单数据
export const putEnterStockDetail = ({ id, data }) => {
  const { base, tableData } = data
  return EnterStock.findAll({
    include: {
      model: EnterStockDetail
    },
    where: {
      id
    }
  })
  .then((resData) => {
    // 筛选原有详情的数据
    const checkData = resData.filter(item => item.enter_stock_detail)
    // 获取原详情数据
    const dataDetail = checkData.map(item => item.enter_stock_detail)
    // 设置现详情数据
    const postData = tableData.map(item => {
      item.enterStockId = id
      return item
    })
    // 判断是否为空数据
    if (checkData.length) { // 若有更新数据则删除所以原来的数据， 再更新
      const ids = dataDetail.map(item => item.id)
      return deleteEnterStockDetail({ids, postData, dataDetail}).then(res => {
        if (res) {
          return updateEnterStock({ base, id })
        } else {
          throw Message(-1, null, '更新失败！')
        }
      })
    } else { // 否则直接添加新的数据
      return updateEnterStockDetail({postData, dataDetail}).then(res => {
        if (res) {
          return updateEnterStock({ base, id })
        } else {
          throw Message(-1, null, '更新失败!')
        }
      })
    }
  })
  .catch((error) => {
    return error
  })
}

// 删除全部数据
const deleteEnterStockDetail = ({ids, postData, dataDetail}) => {
  return EnterStockDetail.destroy({
    where: {
      id: ids
    }
  })
  .then(() => {
    // 更新数据
    return updateEnterStockDetail({postData, dataDetail})
  })
  .catch(err => {
    Message(-1, null, '更新数据失败！')
  })
}

// 更新
const updateEnterStock = ({ id, base }) => {
  return fetchUpdate({
    model: EnterStock,
    id,
    data: base
  })
  .then(res => {
    if (res.code === 0) {
      return Message(0, Number(id), '更新成功！')
    } else {
      return Message(500, {}, null)
    }
  })
}

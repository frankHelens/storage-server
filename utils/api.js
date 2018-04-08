import {
  Message,
  getFilterByList,
  getOrderByList,
  getRelationList
} from './common'

/*
* 通用查询方式
*
*
*/
export const fetchList = (props) => {
  const { model, data, include } = props
  const { orderBy, filterBy, pageSize, pageIndex } = data
  const filterByList = getFilterByList(filterBy)
  const orderByList = getOrderByList(orderBy)
  return model.findAndCount({
    order: orderByList,
    where: filterByList,
    offset: pageIndex ? Number(pageIndex - 1) * Number(pageSize) : 0,
    limit: pageSize ? Number(pageSize) : null,
    include
  })
  .then((res) => {
    return Message(0, {
      data: res.rows,
      recordsFiltered: res.count,
      recordsTotal: res.count
    }, '')
  })
  .catch((err) => {
    console.log('err：', err)
    return Message(500, err)
  })
}

// 创建方法
export const fetchCreate = (props) => {
  const { model, data } = props
  return model.create(data)
  .then((res) => {
    return Message(0, res.id, '添加成功！')
  })
  .catch((err) => {
    console.log('err：', err)
    return Message(500, '', err)
  })
}


// 更新方法
export const fetchUpdate = (props) => {
  const { model, id, data } = props
  return model.update(data, {
    where: {
      id: id
    }
  })
  .then((res) => {
    return Message(0, res.id, '更新成功！')
  })
  .catch((err) => {
    console.log('err：', err)
    return Message(500, '', err)
  })
}

// 删除方法
export const fetchDelete = (props) => {
  const { model, id } = props
  return model.destroy({
    where: {
      id: id
    }
  })
  .then((res) => {
    return Message(0, res.id, '删除成功！')
  })
  .catch((err) => {
    console.log('err：', err)
    return Message(500, '')
  })
}

// 批量删除
export const fetchBatchDelete = (props) => {
  const { model, data } = props
  return model.destroy({
    where: {
      id: data
    }
  })
  .then((res) => {
    return Message(0, res.id, '删除成功！')
  })
  .catch((err) => {
    console.log('err：', err)
    return Message(500, '')
  })
}

// 批量添加
export const fetchBatchCreate = (props) => {
  const { model, data } = props
  return model.bulkCreate(data)
  .then((res) => {
    return Message(0, res, '添加成功！')
  })
  .catch((err) => {
    console.log('err：', err)
    return Message(500, '', err)
  })
}

// 获取关联数据方法
export const fetchRelation = (props) => {
  const { model, data } = props
  return model.findAll({
    where: {
      name: data.split(',')
    }
  })
  .then((res) => {
    return Message(0, getRelationList(res), '')
  })
  .catch((err) => {
    console.log('err：', err)
    return Message(500, '')
  })
}

export const fetch = (props) => { // 自定义查询方法
  const { model, data } = props
  return model.findAll(data)
}

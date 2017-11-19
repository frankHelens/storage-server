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
  const { model, data } = props
  const { orderBy, filterBy, pageSize, pageIndex } = data
  const filterByList = getFilterByList(filterBy)
  const orderByList = getOrderByList(orderBy)
  return model.findAndCount({
    order: orderByList,
    where: filterByList,
    offset: pageIndex ? Number(pageIndex - 1) * Number(pageSize) : 0,
    limit: pageSize ? Number(pageSize) : null
  })
  .then((res) => {
    return Message(0, {
      data: res.rows,
      recordsFiltered: res.count,
      recordsTotal: res.count
    }, null)
  })
  .catch((err) => {
    console.log('err：', err)
    return Message(500, null, '未知异常，请联系管理员！')
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
    return Message(500, null, '未知异常，请联系管理员！')
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
    return Message(500, null, '未知异常，请联系管理员！')
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
    return Message(500, null, '未知异常，请联系管理员！')
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
    return Message(0, getRelationList(res), null)
  })
  .catch((err) => {
    console.log('err：', err)
    return Message(500, null, '未知异常，请联系管理员！')
  })
}

export const fetch = (props) => {
  const { model } = props
  return model.findAll()
}


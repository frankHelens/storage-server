// import xlsx from 'node-xlsx'
// import moment from 'moment'

// module.exports = {
//   successFun: (data, message) => {
//     return {
//       code: 0,
//       data: data,
//       message: message
//     }
//   },
//   errorFun: (data, message) => {
//     return {
//       code: -1,
//       data: data,
//       message: message
//     }
//   },
//   getExcel: function (file) { // 获取表格数据
//     var workSheetsFromFile = xlsx.parse('files/' + file);
//     var dataList = workSheetsFromFile[0].data.filter(function (item, index) {
//       return item.length
//     }).filter(function (item, index) {
//       return index > 0
//     }).map(function (item, index) {
//       var name = item[7] || ''
//       var contact = item[8] || ''
//       var updateTime = item[14] ? moment(new Date(1900, 0, item[14]-1)).format('YYYY-MM-DD') : ''
//       var num = item[15] || ''
//       return [name, contact, updateTime, num]
//     })
//     return dataList
//   }
// }

export const Message = (code, data, message) => {
  const errorInfo = '未知异常，请联系管理员！'
  if (code === 500) {
    message = message 
    ? message.name === 'SequelizeValidationError'
    ? '格式不正确！'
    : errorInfo
    : errorInfo
  }
  return {
    code: code,
    data: data,
    message: message
  }
}

export const getOrderByList = (orderBy) => {
  if (orderBy) {
    return orderBy.split(';').map(item => {
      return item.split('|')
    })
  } else {
    return []
  }
}

export const getFilterByList = (filterBy) => {
  let filterObj = {}
  if (filterBy) {
    filterBy.split(';').map((item) => {
      const filterItem = item.split('|')
      const name = filterItem[0]
      const type = filterItem[1]
      const value = filterItem[2]
      if (type === 'eq') {
        filterObj[name] = value
      }
      if (type === 'like') {
        filterObj[name] = {
          '$like': `%${value}%`
        }
      }
      if (type === 'ge') {
        filterObj[name] = {
          '$gte': Number(value)
        }
      }
      if (type === 'le') {
        Object.assign(filterObj[name], {
          '$lte': Number(value)
        })
      }
    })
  } else {
    filterObj = {}
  }
  return filterObj
}


export const getRelationList = (relation) => {
  let relationList = {}
  groupFormat(relation, 'name').map(item => {
    relationList[item.id] = item.options.map(option => {
      return {
        value: option.value,
        label: option.label
      }
    })
  })
  return relationList
}


export const groupFormat = (arr, id) => {
  var map = {}
  var dest = []
  for (var i = 0; i < arr.length; i++) {
    var ai = arr[i]
    if (!map[ai[id]]) {
      dest.push({
        id: ai[id],
        options: [ai]
      })
      map[ai[id]] = ai
    } else {
      for (var j = 0; j < dest.length; j++) {
        var dj = dest[j]
        if (dj.id === ai[id]) {
          dj.options.push(ai)
          break
        }
      }
    }
  }
  return dest
}
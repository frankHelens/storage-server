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

export function Message (code, data, message) {
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


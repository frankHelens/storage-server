import moment from 'moment'

export const detailPost = (data) => {
  return Object.assign(data.base, {
    code: 'JHD' + moment().format('YYYYMMDD') + '0001'
  })
}


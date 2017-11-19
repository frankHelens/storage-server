import moment from 'moment'

export function timeRender (value, type = 'YYYY-MM-DD') {
  return value ? moment(value).format(type) : ''
}

export function resInfo (code = 0, message = '', data = {}) {
  return {
    code: code,
    data: data,
    message: message
  }
}

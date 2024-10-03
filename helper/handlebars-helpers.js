const dayjs = require('dayjs')

module.exports = {
  dateFormat: function (date) {
    return dayjs(date).format('YYYY-MM-DD')
  },
  //若 a 和 b 相等，會回傳 options.fn(this)，不相等則回傳 options.inverse(this)
  ifCond: function (a, b, options) {
    return a.toString() === b.toString() ? options.fn(this) : options.inverse(this)
  }
}
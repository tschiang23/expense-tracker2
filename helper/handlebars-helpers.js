const dayjs = require('dayjs')

module.exports = {
  dateFormat: function (date) {
    return dayjs(date).format('YYYY-MM-DD')
  }
}
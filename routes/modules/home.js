const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

let totalAmount = 0
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      for (const record of records) {
        totalAmount += record.amount
      }
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.log(err))
})

module.exports = router
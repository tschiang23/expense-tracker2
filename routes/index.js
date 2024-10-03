const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const expense = require('./modules/expense')

router.use('/', home)
router.use('/expenses', expense)

module.exports = router


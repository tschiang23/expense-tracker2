const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const expense = require('./modules/expense')
const user = require('./modules/user')

router.use('/', home)
router.use('/expenses', expense)
router.use('/users', user)

module.exports = router


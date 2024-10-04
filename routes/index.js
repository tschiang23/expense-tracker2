const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const expense = require('./modules/expense')
const user = require('./modules/user')
const { authenticator } = require('../middleware/auth')

router.use('/users', user)

router.use('/', authenticator, home)
router.use('/expenses', authenticator, expense)

module.exports = router


const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const expense = require('./modules/expense')
const user = require('./modules/user')
const auth = require('./modules/auth')
const search = require('./modules/search')

const { authenticator } = require('../middleware/auth')

router.use('/users', user)

router.use('/auth', auth)
router.use('/', authenticator, home)
router.use('/expenses', authenticator, expense)
router.use('/search', authenticator, search)

module.exports = router


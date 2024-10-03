const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/new', async (req, res) => {
  //查詢所有支出類別
  try {
    const categories = await Category.find().lean().exec()
    res.render('new', { categories })
  } catch (error) {
    console.error('Error:', error)
  }
})

router.post('/', async (req, res) => {
  try {
    await Record.create({ ...req.body })
    res.redirect('/')
  } catch (error) {
    console.log('Error:', error)
  }
})

module.exports = router
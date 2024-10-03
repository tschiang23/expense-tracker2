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

//取得修改一筆支出表單
router.get('/:id/edit', async (req, res) => {
  try {
    const { id } = req.params
    const [record, categories] = await Promise.all([
      Record.findOne({ _id: id }).lean().exec(),

      Category.find().lean().exec()
    ])
    res.render('edit', { record, categories })
  } catch (error) {
    console.log('Error:', error)
  }
})

// 修改一筆支出
router.put('/:id', (req, res) => {
  res.send('done')
})

module.exports = router
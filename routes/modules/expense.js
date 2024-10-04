const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/new', async (req, res) => {
  try {
    //查詢所有支出類別
    const categories = await Category.find().lean().exec()
    res.render('new', { categories })
  } catch (error) {
    console.error('Error:', error)
  }
})

router.post('/', async (req, res) => {
  try {
    const userId = req.user._id
    await Record.create({ ...req.body, userId })
    res.redirect('/')
  } catch (error) {
    console.log('Error:', error)
  }
})

//取得修改一筆支出表單
router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const { id } = req.params
    const [record, categories] = await Promise.all([
      Record.findOne({ _id: id, userId }).lean().exec(),

      Category.find().lean().exec()
    ])
    res.render('edit', { record, categories })
  } catch (error) {
    console.log('Error:', error)
  }
})

// 修改一筆支出
router.put('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const id = req.params.id

    await Record.findByIdAndUpdate(id, { ...req.body, userId })

    res.redirect('/')
  } catch (error) {
    console.log('Error:', error)
  }
})
// 刪除一筆支出
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    await Record.deleteOne({ _id, userId })
    res.redirect('/')
  } catch (error) {
    console.log('Error', error)
  }

})
module.exports = router
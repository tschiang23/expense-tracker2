const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')


let recordsData
let categoriesData

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const [recordsTotal, records, categories] = await Promise.all([
      // 計算支出總金額
      Record.aggregate([
        {
          $match: { userId }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" }
          }
        },
      ]).exec(),

      Record.aggregate([
        {
          $match: { userId }
        },
        {
          $lookup: {
            from: 'categories',           // 關聯的集合（即對應的表）
            localField: 'categoryId',     // Record 集合中要匹配的字段
            foreignField: '_id',      // Category 集合中對應的字段
            as: 'categoryInfo'          // 結果保存到的字段名
          }
        },
        {
          $unwind: "$categoryInfo"        // 解構關聯數組
        }
      ]).exec(),

      Category.find().lean().exec()
    ])

    const totalAmount = recordsTotal.length ? recordsTotal[0].total : 0

    res.locals.records = records.map(record => record.amount)
    res.locals.categories = categories

    res.render('index', { records, totalAmount, categories })
  } catch (error) {
    console.error('Error:', error)
  }

})

module.exports = router
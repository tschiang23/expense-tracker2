const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const category = require('../../models/category')

// let totalAmount = 0
router.get('/', async (req, res) => {
  try {
    const [recordsTotal, records] = await Promise.all([
      // 計算支出總金額
      Record.aggregate([{
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      },
      ]).exec(),

      Record.aggregate([
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
    ])

    const totalAmount = recordsTotal[0].total
    res.render('index', { records, totalAmount })
  } catch (error) {
    console.error('Error:', error)
  }

})

module.exports = router
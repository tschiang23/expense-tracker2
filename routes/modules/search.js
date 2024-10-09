const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const mongoose = require('mongoose')

router.get('/', async (req, res) => {
  try {
    let { month, categoryId } = req.query
    let categoryObj = {}
    let monthObj = {}
    const userId = req.user._id

    //如果月分與類別ID不存在 導回首頁
    if (!month && !categoryId) {
      return res.redirect('/')
    }
    //類別ID存在 轉換categoryId 為ObjectID
    if (categoryId) {
      categoryId = new mongoose.Types.ObjectId(`${categoryId}`)
      categoryObj.categoryId = categoryId
    }

    //如果月份存在 動態建構 $match
    if (month) {
      month = Number(month)
      monthObj.$expr = { $eq: [{ $month: "$date" }, month] };
    }

    const [recordsTotal, records, categories] = await Promise.all([
      // 計算支出總金額
      Record.aggregate([
        {
          $match: {
            $and: [
              { userId },
              { ...categoryObj },
              // {
              //   $expr: {
              //     $and: [
              //       { $eq: [{ $year: "$date" }, 2024] },  // 查詢年份為 2024
              //       { $eq: [{ $month: "$date" }, month] }   // 查詢月份為 10 月
              //     ]
              //   }
              // }
            ]
          }
        },
        {
          $match: monthObj
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
          $match: { ...categoryObj }
        },
        {
          $match: monthObj
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
    res.render('index', { records, totalAmount, categories, categoryId, month })

  } catch (err) {
    console.log('error', err)
  }
})

module.exports = router
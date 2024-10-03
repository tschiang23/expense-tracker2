const db = require('../../config/mongoose')
const Record = require('../record')
const Category = require('../category')

const SEED_RECORDS = [
  {
    name: '午餐',
    amount: 100

  },
  {
    name: '晚餐',
    amount: 100
  },
  {
    name: '捷運',
    amount: 200
  },
  {
    name: '租金',
    amount: 1650,
  },
  {
    name: '衣服',
    amount: 250
  },
]


db.once('open', () => {
  for (const item of SEED_RECORDS) {
    Record.create({
      name: item.name,
      amount: item.amount,
      date: new Date(),
      categoryId: "66fcbdbe0d6827caaf986c77"
    })
  }
})
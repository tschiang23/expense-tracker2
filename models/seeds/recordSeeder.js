const db = require('../../config/mongoose')
const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const bcrypt = require('bcrypt')
const { process_params } = require('express/lib/router')

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

const SEED_USER = [
  {
    name: 'root',
    email: 'root@example.com',
    password: bcrypt.hashSync('12345678', 10)
  },
  {
    name: 'user1',
    email: 'user1@example.com',
    password: bcrypt.hashSync('12345678', 10)
  }
]

db.once('open', () => {

  // return Promise.all(SEED_USER.map(obj =>
  //   User.create({
  //     name: obj.name,
  //     email: obj.email,
  //     password: obj.password
  //   })
  // ))
  //   .then(result => {
  //     console.log('create user done')
  //   })

  User.insertMany(SEED_USER)
    .then(users => {
      console.log('Create users done')
      const records = SEED_RECORDS.map((obj, i) => {
        if (i <= 4) {
          obj.userId = users[0]._id.toString()
        } else {
          obj.userId = users[1]._id.toString()
        }
        return obj
      })

      return records
    })
    .then(records => {
      return Category.find().then(categories => {

        const results = records.map(record => {
          const randomNumber = Math.floor(Math.random() * categories.length)
          const categoryId = categories[randomNumber]._id.toString()
          record.categoryId = categoryId
          record.date = Date.now()
          return record
        })
        return results
      })
    })
    .then(results => Record.insertMany(results))
    .then(() => {
      console.log('Create records done')
      process.exit()
    })
})
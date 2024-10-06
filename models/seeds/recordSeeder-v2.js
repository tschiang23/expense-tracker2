const db = require('../../config/mongoose')
const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const bcrypt = require('bcrypt')

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
    password: '12345678'
  },
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  }
]

db.once('open', async () => {
  try {
    // for of
    let users = []
    for (user of SEED_USER) {
      const hash = await bcrypt.hash(user.password, 10)
      const userData = await User.create({
        name: user.name,
        email: user.email,
        password: hash
      })
      users.push(userData)
    }
    console.log('Create users done')
    //Array.map
    // const users = await Promise.all(SEED_USER.map(async (e, i) => {
    //   const hash = await bcrypt.hash(e.password, 10)
    //   return User.create({
    //     name: e.name,
    //     email: e.email,
    //     password: hash
    //   })
    // }))
    const categories = await Category.find().lean().exec()

    //entries() 方法會回傳一個包含陣列中每一個索引之鍵值對（key/value pairs）的新陣列迭代器（Array Iterator）物件。
    for await (const [i, obj] of SEED_RECORDS.entries()) {
      let randomNumber = Math.floor(Math.random() * categories.length)
      let categoryId = categories[randomNumber]._id.toString()

      if (i <= 4) {
        obj.userId = users[0]._id.toString()
      } else {
        obj.userId = users[1]._id.toString()
      }

      obj.categoryId = categoryId
      obj.date = Date.now()
      await Record.create({ ...obj })
    }

    console.log('Create records done')

    //Array.from
    // console.log(Array.from([1, 2, 3], (x,i) => x + x))
    //// [2, 4, 6]
    // console.log(Array.from({ length: 5 }, (v, i) => i))
    // [0, 1, 2, 3, 4]
    process.exit()
  } catch (error) {
    console.log('Error:', error)
  }
})
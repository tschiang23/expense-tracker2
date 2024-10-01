const db = require('../../config/mongoose')
const Record = require('../record')

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Record.create({
      name: `name-${i}`,
      date: Date.now(),
      amount: 100
    })
  }
  console.log('done')
})
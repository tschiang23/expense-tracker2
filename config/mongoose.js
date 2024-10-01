if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI) // 連線資料庫
const db = mongoose.connection // 取得資料庫連線狀態

db.on('error', () => console.log('Mongodb error'))

db.once('open', () => console.log('Mongodb connected'))

module.exports = db
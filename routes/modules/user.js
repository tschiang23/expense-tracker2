const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcrypt')

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', passport.authenticate('local', {
  failureFlash: true,
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login')
  })
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body

    // 註冊表單錯誤處理
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
      errors.push({ message: '所有欄位都是必填。' })
    }
    if (password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符！' })
    }
    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }

    const foundUser = await User.findOne({ email }).lean().exec()

    if (foundUser) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', { name, email, password, confirmPassword })
    }


    const hash = await bcrypt.hash(password, 10)
    await User.create({ name, email, password: hash })
    res.redirect('/users/login')
  } catch (error) {
    console.log('Error:', error)
  }
})

module.exports = router
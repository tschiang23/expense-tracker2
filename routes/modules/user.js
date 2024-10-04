const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcrypt')

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/users/login')
  })
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    const foundUser = await User.findOne({ email }).lean().exec()

    if (foundUser) {
      console.log('User already exists ')
      return res.render('register', { name, email, password, confirmPassword })
    }

    if (password !== confirmPassword) {
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
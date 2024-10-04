const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

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
    const userData = req.body
    const foundUser = await User.findOne({ email: userData.email }).lean().exec()

    if (foundUser) {
      console.log('User already exists ')
      return res.render('register', { userData })
    }

    if (userData.password !== userData.confirmPassword) {
      return res.render('register', { userData })
    }

    delete userData.confirmPassword
    await User.create({ ...userData })
    res.redirect('/users/login')
  } catch (error) {
    console.log('Error:', error)
  }
})

module.exports = router
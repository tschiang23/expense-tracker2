const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email }).exec()

      if (!user) {
        return done(null, false, { message: 'That email is not registered!' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return done(null, false, { message: 'Email or Password incorrect.' })
      }

      return done(null, user)

    } catch (err) {
      done(err, false)
    }
  }))

  //google 
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { name, email } = profile._json

          const foundUser = await User.findOne({ email })
          if (foundUser) return done(null, foundUser)

          const randomPassword = Math.random().toString(36).slice(-8)

          const hash = await bcrypt.hash(randomPassword, 10)

          const createdUser = await User.create({ name, email, password: hash })
          return done(null, createdUser)
        } catch (err) {
          return done(err, false)
        }

      }
    )
  )

  // 設定序列化與反序列
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      done(null, user)
    } catch (err) {
      done(err, null)
    }
  })
}
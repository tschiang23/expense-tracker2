require('./config/mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')

const session = require('express-session')
const routes = require('./routes')
const usePassport = require('./config/passport')

const PORT = process.env.PORT || 3000

const app = express()


app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs', helpers: require('./helper/handlebars-helpers') }))
app.set('view engine', 'hbs')

//middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  res.locals.error = req.flash('error')
  next()
})

app.use(routes)

app.listen(PORT, () => console.log(`App is running on ${PORT}`))
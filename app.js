require('./config/mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')

const PORT = process.env.PORT || 3000

const app = express()


app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs', helpers: require('./helper/handlebars-helpers') }))
app.set('view engine', 'hbs')

//middleware
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, () => console.log(`App is running on ${PORT}`))
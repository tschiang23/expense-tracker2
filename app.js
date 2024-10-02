require('./config/mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')

const PORT = process.env.PORT || 3000

const app = express()


app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs', helpers: require('./helper/handlebars-helpers') }))
app.set('view engine', 'hbs')

app.use(routes)

app.listen(PORT, () => console.log(`App is running on ${PORT}`))
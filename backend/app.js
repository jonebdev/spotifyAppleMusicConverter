require('dotenv').config({ path: '.env' })
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const routes = require('./routes')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/', routes)

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

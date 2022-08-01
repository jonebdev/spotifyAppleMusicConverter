require('dotenv').config({ path: '.env' })
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const PORT = process.env.PORT || 8080
const routes = require('./routes')
const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api/v1', routes)

app.get('/', function (req, res) {
  console.log('Cookies: ', JSON.stringify(req.cookies))
  console.log('Signed Cookies: ', JSON.stringify(req.signedCookies))

  res.send({ foo: 'bar' })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

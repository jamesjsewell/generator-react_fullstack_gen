const express = require('express')
const path = require('path')
// const mustacheExpress = require('mustache-express') // example for using server side views

const app = express()

// if the app is using server side templating like mustache:
// make sure to create a views folder
// app.engine('mustache', mustacheExpress())
// app.set('views', './views')
// app.set('view engine', 'mustache')

// set usefull headers:
app.all('*', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
  )
  next()
})

// serves up the static files
app.use(express.static(path.resolve(__dirname, '../build')))
// if the app is a single page app, like a react app that uses react router for example
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'))
)

// at the bottom of the server file, set the port like this, so that heroku can set the port when the server is being hosted there
const PORT = process.env.PORT || 8080
app.listen(PORT, function () {
  console.log('\n\n===== listening for requests on port ' + PORT + ' =====\n\n')
})

module.exports = {}

const express = require('express')
const fs = require('fs')
const https = require('https')
const app = express()

app.get('/', function (req, res) {
  res.send('Working Title')
})

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(3000, function () {
  console.log('Example app listening on port 3000! Go to https://localhost:3000/')
})

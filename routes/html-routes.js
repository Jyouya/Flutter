<<<<<<< HEAD
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
=======
const path = require("path");

module.exports = app => {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get("/account", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/account.html"));
    });
}

>>>>>>> fae7482d114bf5ee9bbd2e9e95d6fa33c4611a43

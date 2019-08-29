const https = require('https');
const express = require('express');
const fs = require ('fs');
const app = express();
const PORT = process.env.PORT || 8443;
app.get('/', function (req, res) {
  res.send('Working-Title')
})

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(8443, function () {
  console.log('Example app listening on port 8443! Go to https://localhost:8443/')
})


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



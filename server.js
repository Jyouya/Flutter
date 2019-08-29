const https = require('https');
const express = require('express');
const fs = require ('fs');
const app = express();
const PORT = process.env.PORT || 8443;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const html = require('./routes/html-routes')(app);

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '! Go to https://localhost:' + PORT)
})
const https = require('https');
const express = require('express');
const fs = require ('fs');
const app = express();
const path = require("path");

const PORT = process.env.PORT || 8443;

const models = require("./models");

app.use(express.static(path.join(__dirname, "/public")));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/html-routes')(app);

models.sequelize.sync().then(() => {

  https.createServer({
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.cert')
  }, app).listen(PORT, function () {
      console.log('Example app listening on port ' + PORT + '! Go to https://localhost:' + PORT)
  });

});

module.exports = app; // for testing
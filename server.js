require('dotenv').config();
const https = require('https');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const authorizer = require('./middleware/authorizer');
const fs = require ('fs');
const app = express();

const PORT = process.env.PORT || 8443;

const models = require("./models");

app.use(express.static(path.join(__dirname, "/public")));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

require('./routes/permissions')(authorizer);
app.use(authorizer.mw);

// Static directory
app.use(express.static(path.join(__dirname, './public')));

// Routes
// =============================================================
require('./routes/api-routes')(app);
require('./routes/html-routes')(app);




models.sequelize.sync({force: false}).then(() => {

  https.createServer({
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.cert')
  }, app).listen(PORT, function () {
      console.log('Example app listening on port ' + PORT + '! Go to https://localhost:' + PORT)
      app.emit( "app_started" )
  });

});

module.exports = app; // for testing

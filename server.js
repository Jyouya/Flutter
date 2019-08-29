const https = require('https');
const express = require('express');
const fs = require ('fs');
const app = express();
const path = require("path");

const models = ("./models");

const PORT = process.env.PORT || 8443;

app.use(express.static(path.join(__dirname, "/public")));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/html-routes')(app);

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '! Go to https://localhost:' + PORT)
});

// if (process.env.NODE_ENV !== 'test') {
//     models.sequelize.sync().then(() => {
//         app.listen(PORT, function () {
//             console.log('App listening on PORT ' + PORT);
//         });
//     });

// }

module.exports = app; // for testing
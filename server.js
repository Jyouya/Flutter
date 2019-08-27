const models  = require('./models');
const express = require("express");
const PORT = process.env.PORT || 8080;

const app = express();
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("/public"));

// Routes
// =============================================================
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
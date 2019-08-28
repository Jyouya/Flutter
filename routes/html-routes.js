const path = require("path");

module.exports = app => {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    // app.get("/main.css", function (req, res) {
    //     res.sendFile(path.join(__dirname, "../public/css/main.css"));
    // });

    // app.get("/reset.css", function (req, res) {
    //     res.sendFile(path.join(__dirname, "../public/css/reset.css"));
    // });

}


const path = require("path");

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get('/profile', function (req, res) {
        // Are we looking for a specific profile?
        if (req.query.id) {
            // Serve the file, front end JS will load the rest
            res.sendFile(path.join(__dirname, "../public/account.html"));
        } 

        // Are we logged in?
        else if (req.userId) { 
            // Redirect to the user's profile
            res.redirect(`/profile?id=${req.userId}`)
        } 
        
        else {
            res.redirect('/login')
        }
    });

    app.get("/login", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/register", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/register.html"));
    });
}


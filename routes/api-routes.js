const db = require('../models');
const auth = require('./auth');
const verify = require('../verify');


module.exports = (app) => {
    auth(app, db); // Create POST routes for /api/login and /api/users

    // A test route for automated testing.  Don't change.
    app.post('/api/authtest', async function (req, res) {
        try {
            const { userId, type } = await verify(req.body.jwt, req);
            res.json({
                msg: `Hello ${(await db.User.findOne({
                    where: {
                        id: userId
                    }
                })).username}`
            });
        } catch (err) {
            res.status(403).json({msg: err});
        }
    });

};


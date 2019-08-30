const db = require('../models');
const auth = require('./authentication');
const verify = require('../verify');


module.exports = (app, authorizer) => {
    auth(app, db, authorizer); // Create POST routes for /api/login and /api/users

    // A test route for automated testing.  Don't change.
    authorizer.register('/api/authtest', ['basic', 'mod', 'admin'], ['GET', 'POST']);
    app.post('/api/authtest', async function (req, res) {
        try {
            // const { userId, type } = await verify(req.body.jwt, req);
            const userId = req.userId;
            const username = (await db.User.findOne({
                where: {
                    id: userId
                }
            })).username

            res.json({
                msg: `Hello ${username}`
            });
        } catch (err) {
            console.log(err);
            res.status(403).json({ msg: err });
        }
    });

    authorizer.register('/api/restrictedtest', ['basic', 'admin'], ['GET']);
    authorizer.register('/api/restrictedtest', ['admin'], ['POST']);
    app.route('/api/restrictedtest')
        .get(function (req, res) {
            res.json({
                msg: 'You got the thing!'
            });
        })
        .post(function(req, res){ 
            res.json({
                msg: 'You posted the thing!'
            });
        });

};


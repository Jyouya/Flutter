const db = require('../models');
const auth = require('./auth');


module.exports = (app) => {
    const verify = auth(app, db); // POST routes for /api/login, /api/users

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


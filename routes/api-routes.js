const db = require('../models');
const auth = require('./authentication');
const verify = require('../verify');


module.exports = (app) => {
    auth(app, db); // Create POST routes for /api/login and /api/users

    require('./regex-route')(app);

    // A test route for automated testing.  Don't change.
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

    app.post('/api/posts', async function (req, res) {
        await db.Post.create({
            content: req.body.content,
            UserId: req.userId,
            replyId: req.body.replyId || null,
        });
        res.json({ msg: 'Post added successfuly' });
    });


    app.route('/api/restrictedtest')
        .get(function (req, res) {
            res.json({
                msg: 'You got the thing!'
            });
        })
        .post(function (req, res) {
            res.json({
                msg: 'You posted the thing!'
            });
        });

    app.route('/api/trendingtest')
        .get(async function (req, res) {
            const posts = await db.Post.findAll({
                order: [['cachedTrendingIndex', 'DESC']]
            });
            res.json(posts);
        });

    app.get('/api/users/:id', async function (req, res) {
        const id = req.params.id;
        res.json(await db.User.findOne({
            where: {
                id: id
            }
        }));
    });

};


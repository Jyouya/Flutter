const db = require('../models');
const auth = require('./authentication');
const verify = require('../verify');


module.exports = (app) => {
    auth(app, db); // Create POST routes for /api/login and /api/users

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
    
    app.post('/api/posts',async function(req,res){
        await db.Post.create({
            content: req.body.content,
            UserId: req.userId,
            replyId: req.body.replyId || null,
        });
        res.json({msg: 'Post added successfuly'});
    });

    // IF the user uses /api/posts?count=10, will send 10 back; otherwise 20
    app.get("/api/posts/", async function (req, res) {
        const count = req.query.count || 20;
        const output = await db.Post.findAll({
            limit: count,
            include: [{
                model: db.User,
                attributes: ["id", "username", "avatarImg"]
            }]
        });
        res.json(output);
    });

    // app.post('/replies/:id', function (req, res) {
    //     db.Post.findOne({
    //         where:{
    //             id:req.params.id
    //         }
    //     }).then(
    //         (post) => {
    //             db.Post.create({content: req.body}).then( //req.body.content refering to the content of the post.
    //                 (reply) => {
    //                     reply.SetReplyingTo(post).then(
    //                         (self) => {
    //                             //now this post has a replyId of the id of the post it is replying to, thus tying it to that post along with its normal autoincremented id
    //                         }
    //                     )
    //                 }
    //             )
    //         })
    // })

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


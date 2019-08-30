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
            res.status(403).json({ msg: err });
        }
    });
    app.Post('/posts',function(req,res){
        db.Post.create({content: req.body.content}).then(function(post){
            console.log("post added to api")
        })
    })
    app.Post('/replies/:id', function (req, res) {
        db.Post.findOne({
            where:{
                id:req.params.id
            }
        }).then(
            (post) => {
                db.Post.create({content: req.body}).then( //req.body.content refering to the content of the post.
                    (reply) => {
                        reply.SetReplyingTo(post).then(
                            (self) => {
                                //now this post has a replyId of the id of the post it is replying to, thus tying it to that post along with its normal autoincremented id
                            }
                        )
                    }
                )
            })
    })

};


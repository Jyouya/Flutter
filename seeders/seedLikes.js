const db = require('../models');


async function seedLikes() {
    const users = await db.User.findAll({});
    const posts = await db.Post.findAll({});
    for (user of users) {
        for (post of posts) {
            if (post.UserId !== user.id) {
                if (Math.random() > .5) {
                    const like = await db.Like.create({UserId: user.id, PostId: post.id});
                    await like.weigh();
                    // await user.addLike(post.id);
                }
            }
        }
    }
}

module.exports = seedLikes().then(() => console.log('done'));
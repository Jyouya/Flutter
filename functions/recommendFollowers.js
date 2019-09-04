const db = require('../models');

module.exports = async function (userId) {
    console.log('debug');
    // You want to follow people who people you follow follow
    // You want to follow people who like the same posts you do

    // First, get a list of userIds that you follow
    const following = await getFollowing(userId);

    // total holds the score for each user.  The users with the highest scores get recommended
    const total = {};
    for (user of following) {
        const followingFollowing = await getFollowing(user.id);
        for (user of followingFollowing) {
            total[user.id] = (total[user.id]|| 0) + 1;
        }
    }

    // Now find users who like the same posts as you.  

    return total;

    const likes = await getLikes(userId);
}

async function getFollowing(userId) {
    return  db.User.findAll({
        include: [{
            model: db.User,
            as: 'Followers',
            where: {
                id: userId // id is FollowerId
            },
            attributes: []
        }],
        attributes: ['id', 'username', 'avatarImg']
    })
}

async function getFollowers(userId) {
    return (await db.User.findOne({
        where: {
            id: userId
        },
        include: [
            {
                model: db.User,
                as: 'Followers',

                attributes: ['username', 'id', 'avatarImg']
            }
        ],
        attributes: []
    })).followers
}
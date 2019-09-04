const db = require('../models');

module.exports = async function (userId) {
    console.log('debug');
    // You want to follow people who people you follow follow
    // You want to follow people who like the same posts you do

    // First, get a list of userIds that you follow
    const following = await getFollowing(userId);

    // total holds the score for each user.  The users with the highest scores get recommended
    const total = {};
    for (let user of following) {
        const followingFollowing = await getFollowing(user.id);
        for (let user of followingFollowing) {
            total[user.id] = (total[user.id] || 0) + 1;
        }
    }

    // Now find users who like the same posts as you. 

    // First, get all of your likes
    const likes = await getLikes(userId);

    // TODO ==================================================================
    // The execution time on this will scale horribly.  
    // This should be cached, and only calculated once per hour per user.
    // If the user follows all 10 recommendations, it will recalculate early.
    // =======================================================================

    for (like of likes) { // Hide your shields!
        // Find all other likes on the same post
        otherLikes = await db.Like.findAll({
            where: {
                PostId: like.PostId
            }
        });

        for (match of otherLikes) {
            if (match.UserId != userId) {
                // Multiply the weights of likes together, then scale it
                // Scale by a power of two for faster multiplication
                const weight = match.weight * like.weight * 34359738368; // 2 ** 35
                total[match.UserId] = (total[match.UserId] || 0) + weight;
            }
        }
    }

    // Find the 10 users with the highest scores
    // Exclude people we are already following
    const recommendIds = Object.keys(total);
    recommendIds.sort((a, b) => {
        return total[a] - total[b];
    })

    // console.log(total);
    return recommendIds.filter(v => !following.with('id', v)).slice(0,10);
}

async function getFollowing(userId) {
    return db.User.findAll({
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

async function getLikes(userId) {
    return db.Like.findAll({
        where: {
            UserId: userId
        }
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

Array.prototype.with = function (key, val) {
    for (el of this) {
        if (el[key] === val) {
            return (el);
        }
    }
}
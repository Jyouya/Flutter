const db = require('../models');


async function seedFollows() {
    const users = await db.User.findAll({});
    for (user of users) {
        for (otherUser of users) {
            if (otherUser.id !== user.id) {
                if (Math.random() > .5) {
                    await otherUser.addFollower(user.id);
                }
            }
        }
    }
}

module.exports = seedFollows().then(() => console.log('done'));

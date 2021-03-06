const emojiRegex = require('../emoji-validation-regex');
// const uuid = require('uuid/v4');
module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                is: {args: emojiRegex, msg: "Emojis Only!"}
            }
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                isEmail: {args: true, msg: "Invalid email!"}
            }
        },
        bannerImg: {
            type: DataTypes.STRING,
            defaultValue: "https://images.pexels.com/photos/2179389/pexels-photo-2179389.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        },
        avatarImg: {
            type: DataTypes.STRING,
            defaultValue: "/images/blank-avatar.jpg"
            // defaultValue: functionThatGeneratesRandomEmojiURL()
        },
        bio: {
            type: DataTypes.STRING,
            defaultValue: "🙈🙉🙊"
        },
        passHash: {
            type: DataTypes.BLOB,
            allowNull: false
        },
        salt: {
            type: DataTypes.BLOB,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            defaultValue: 'basic'
        },
    });

    User.associate = function(models) {
        // User.hasMany(models.Post); // posts aren't created yet
        User.hasMany(models.Token);
        User.hasMany(models.Post);
        
        User.belongsToMany(User, {
            as: 'Followers',
            through: 'Follow'
        });

    };

    return User;
};
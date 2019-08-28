const emojiRegex = require('../emoji-validation-regex');
const uuid = require('uuid/v4');
module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: uuid()
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                is: emojiRegex
            }
        },
        password: {
            type: DataTypes.BLOB(256),
            allowNull: false
        },
        salt: {
            type: DataTypes.BLOB(256),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            isEmail: true
        }

    });

    User.associate = function(models) {
        // User.hasMany(models.Post); // posts aren't created yet
        User.hasMany(models.Token);
        User.hasMany(models.Post);
        User.hasMany(models.Reply);
        User.hasMany(models.Like);
    };

    return User;
};
'use strict';
const emojiRegex = require('../emoji-validation-regex');
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: emojiRegex
      }
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    replyId: {
      type: DataTypes.INTEGER
    }
    // createdAt and updatedAt are auto-generated by sequelize.
  },{
    instanceMethods: {
      getReplyingTo: function() {
        return this.sequelize.models.Post.findByPrimary(this.replyId)
      },
      setReplyingTo: function(ReplyingToPost){
        return this.update({ replyId: replyingToPost.id })
    }
  }
  });
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
    Post.hasMany(models.Post, {
      as: 'Replies',
      foreignKey: 'replyId'
    })
    //Post.hasMany(models.Like)
  }
return Post;
};
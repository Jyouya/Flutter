'use strict';
module.exports = (sequelize, DataTypes) => {
  /*
  const Reply = sequelize.define('Reply', {
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
      primaryKey: true,
    }
    // createdAt and updatedAt are auto-generated by sequelize.
  });
  Reply.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
    Post.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Reply;
  */
 const name="repliesName"
 return name
};
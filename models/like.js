'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    likeID: {
      type: DataTypes.INTEGER,
      autoIncrement: true}
    // createdAt and updatedAt are auto-generated by sequelize.
  });
  Like.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
    })
    Post.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Like;
};
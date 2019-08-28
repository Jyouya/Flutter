'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    id: DataTypes.INTEGER
  }, {});
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
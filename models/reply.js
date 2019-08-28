'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    content: DataTypes.TEXT
  }, {});
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
};
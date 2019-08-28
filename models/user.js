'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    Author.hasMany(models.Post, {
      onDelete: "cascade"
    });
    Author.hasMany(models.Reply, {
      onDelete: "cascade"
    });
    Author.hasMany(models.Like, {
      onDelete: "cascade"
    });
  };
  return User;
};
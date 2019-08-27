module.exports = function(sequelize, DataTypes) {
    var Like = sequelize.define("Like", {
      // Giving the Author model a name of type STRING
      user:
      post:
      timestamp:
    });
  
    Like.associate = function(models) {Like.belongsTo(models.Post)};
    Like.associate = function(models) {Like.belongsTo(models.User)};
  
    return Like;
  };
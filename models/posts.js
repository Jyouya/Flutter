module.exports = function(sequelize, DataTypes) {
    const Post = sequelize.define("Post", {
      // Giving the Author model a name of type STRING
      cotent: DataTypes.STRING,
      user:
      timestamp:
      id:
    });
  
    Post.associate = function(models) {Post.belongsTo(models.User)};
  
    return Post;
  };
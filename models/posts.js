module.exports = function (sequelize, DataTypes) {
  Post.sync({ force: true }).then(() => {
    const Post = sequelize.define("Post", {
      cotent: DataTypes.TEXT,
      timestamps: true,
      id: { type: Sequelize.INTEGER, autoIncrement: true }
    });

    Post.associate = function (models) {
      Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
    };
      return Post;
  })
};
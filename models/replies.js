module.exports = function(sequelize, DataTypes) {
  var Reply = sequelize.define("Reply", {
    // Giving the Author model a name of type STRING
    content: DataTypes.STRING,
    post:
    user:
    timestamp:
  });

  Reply.associate = function(models) {Reply.belongsTo(models.Post)};
  Reply.associate = function(models) {Reply.belongsTo(models.User)};

  return Reply;
};
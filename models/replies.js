module.exports = function (sequelize, DataTypes) {
  Reply.sync({ force: true }).then(() => {
    const Reply = sequelize.define("Reply", {
      content: DataTypes.TEXT,
      timestamps: true,
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true
      }
    });

    Reply.associate = function (models) {
      Reply.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false
        }
      })
    };
    Reply.associate = function (models) {
      Reply.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
    };
    return Reply;
  })
};
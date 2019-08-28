module.exports = function (sequelize, DataTypes) {
  User.sync({ force: true }).then(() => {
    const User = sequelize.define("User", {
      name: DataTypes.STRING,
      id: { type: Sequelize.INTEGER, autoIncrement: true },
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true }
      }
    });
      return User;
  })
};
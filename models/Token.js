module.exports = function(sequelize, DataTypes) {
    /*
    const Token = sequelize.define('Token', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        }
        // createdAt and updatedAt are auto-generated by sequelize.  
    });

    Token.associate = function(models) {
        Token.belongsTo(models.User, {
            foreignKey: {
                userId: models.User.id
            }
        });
    };
*/
    const Token= "token"
    return Token;
};
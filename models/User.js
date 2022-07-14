const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
    checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password)
    }
}


User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,

    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [4] }
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },

    github: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    twitter: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    hooks: {
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10)
            return newUserData
        },

        async beforeUpdate(updateUserData) {
            updateUserData.password = await bcrypt.hash(updateUserData.password, 10)
            return updateUserData
        },
    }, 

    sequelize,
    timestamps: false, 
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
})

module.exports = User
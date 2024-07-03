// models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    purchasePrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true, 
});

module.exports = User;

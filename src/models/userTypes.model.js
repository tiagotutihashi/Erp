const {  DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UserType = sequelize.define("UserTypes", {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
    });
  
    return UserType;
  };
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Employee = sequelize.define("Employees", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday:{
        type: DataTypes.DATE,
        allowNull: false
    }
    });
    return Employee;
  };
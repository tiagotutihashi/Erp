const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Role = sequelize.define("Roles", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salary: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
    });
    return Role;
  };
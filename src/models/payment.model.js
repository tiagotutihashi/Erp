const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Payment = sequelize.define("Payments", {
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    discount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
    });
    return Payment;
  };
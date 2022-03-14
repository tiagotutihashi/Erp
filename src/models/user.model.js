const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define("Users", {
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    
    User.prototype.toJSON =  function () {
      var values = Object.assign({}, this.get());
    
      delete values.password;
      return values;
    }

    return User;
  };
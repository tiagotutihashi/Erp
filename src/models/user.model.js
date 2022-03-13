const {  DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      }
    });
    
    User.prototype.toJSON =  function () {
      var values = Object.assign({}, this.get());
    
      delete values.password;
      return values;
    }

    return User;
  };
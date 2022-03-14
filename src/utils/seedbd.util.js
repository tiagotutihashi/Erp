const db = require("../services/db.service")
const jwt = require('jsonwebtoken')

const UserType = db.userType
const User = db.user

function initial() {
    UserType.create({
      id: 1,
      name: "user"
    });
   
    UserType.create({
      id: 2,
      name: "moderator"
    });
   
    UserType.create({
      id: 3,
      name: "admin"
    });
  }

  module.exports = {
    initial
  }
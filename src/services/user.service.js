const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('./db.service')
const { secret } = require('../config/general.config')
const { validEmail } = require("../utils/helper.util")

const User = db.user
const UserType = db.userType

async function create(user) {

  const validedEmail = validEmail(user.email);

  if(!validedEmail){
    return { message: "Email is invalid"};
  }

  if(user.UserTypeId <= 0){
    return { message: "UserTypeId is invalid, must be greater than 0"}
  }

  const foundUser = await User.findOne({
    where: {
      email: user.email
    }
  })

  if(foundUser){
    return { message: "Email is already in use!"};
  }

  const createdUser = await User.create({
    email: user.email,
    password: bcrypt.hashSync(user.password, 8),
  })

  if (createdUser) {
    if (user.UserTypeId) {
      const userType = await UserType.findByPk(user.UserTypeId)

      if (userType) {
        await createdUser.setUserType(userType)
      }

      return createdUser
    }
  }

  return { message: "Error creating user type"}
}

async function login(res, user) {
  const foundUser = await User.findOne({
    where: {
      email: user.email,
    },
  })

  if (foundUser) {
    const passwordIsValid = bcrypt.compareSync(
      user.password,
      foundUser.password
    )
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      })
    }
    const token = jwt.sign({ id: foundUser.id }, secret, {
      expiresIn: 86400, // 24 hours
    })
    const dataToSend = {
      ...foundUser.toJSON(),
      token,
    }
    return res.send(dataToSend)
  }
  return res.status(404).send({ message: 'User Not found.' })
}

async function update(res, id, userData, auth){
  
  if(userData.email){
    const validedEmail = validEmail(userData.email);

    if(!validedEmail){
      return res.status(400).json({ message: "Email is invalid"});
    }
    const emailUser = await User.findOne({
      where: {
        email: userData.email,
        id: { [Op.ne]: id }
      }
    })
  
    if(emailUser){
      return { message: "Email is already in use!"};
    }
  }
  
  if(userData.UserTypeId){
    if(userData.UserTypeId <= 0){
      return res.status(400).json({ message: "UserTypeId is invalid, must be greater than 0"});
    }
  }

  if(userData.password){
    userData.password = bcrypt.hashSync(userData.password, 8)
  }

  const authUser = await User.findOne({
    where: {
      id: auth,
    },
  })

  if(id != authUser.id){
    if(authUser.UserTypeId !== 3){
      return res.status(401).send({ message: 'Unauthorized' })
    }
  } 

  const foundUser = await User.findOne({
    where: {
      id: id,
    },
  })

  if(!foundUser){
    return res.status(404).send({ message: 'User Not found.' })
  } 

  await await User.update(userData, {
    where: {
      id: id,
    },
  })

  return res.status(204).send();

}

module.exports = {
  create,
  login,
  update
}

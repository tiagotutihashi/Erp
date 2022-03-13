const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('./db.service')
const { secret } = require('../config/general.config')

const User = db.user
const UserType = db.userType

async function create(user) {
  const createdUser = await User.create({
    username: user.username,
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

  return null
}

async function login(res, user) {
  const foundUser = await User.findOne({
    where: {
      username: user.username,
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
    const token = jwt.sign({ id: user.id }, secret, {
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

module.exports = {
  create,
  login,
}

const { Op } = require('sequelize')
const db = require('./db.service')

const UserType = db.userType

async function Create(userType) {
  const data = UserType.create(userType)

  return data
}

async function FindAll(filters) {
  const { name } = filters

  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null

  const result = await UserType.findAll({
    where: condition,
  })

  return result
}

async function FindOne(id) {
  const result = await UserType.findByPk(id)

  return result
}

async function Update(id, userType) {
  const updatedUserType = await UserType.update(userType, {
    where: { id },
  })

  return updatedUserType
}

async function Remove(id) {
  const deletedUserType = await UserType.destroy({
    where: { id },
  })

  return deletedUserType
}

module.exports = {
  Create,
  FindAll,
  FindOne,
  Update,
  Remove,
}

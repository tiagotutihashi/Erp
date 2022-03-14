const { Op } = require('sequelize')
const db = require('./db.service')
const { listPage, listPerPage } = require("../config/general.config")

const UserType = db.userType

async function create(userType) {
  const data = UserType.create(userType)

  return data
}

async function findAll(filters) {
  const { name, page, perPage } = filters

  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null
  
  let offsetPage = listPage;

  if(page){
    offsetPage = page - 1
  } 

  if(perPage){
    offsetPage = offsetPage * perPage
  } else {
    offsetPage = offsetPage * listPerPage
  }

  const perPageAmount = parseInt(perPage, 10) || listPerPage;

  const result = await UserType.findAndCountAll({
    where: condition,
    limit: perPageAmount,
    offset: offsetPage 
  })

  let currentPage = offsetPage;

  if(page == 1 || offsetPage == 0){
    currentPage = offsetPage + 1
  }

  const dataToSend = {
    page: currentPage,
    totalPages: Math.ceil(result.count / perPageAmount),
    perPage: perPageAmount,
    ...result,
  }

  return dataToSend
}

async function findOne(id) {
  const result = await UserType.findByPk(id)

  return result
}

async function update(id, userType) {
  const updatedUserType = await UserType.update(userType, {
    where: { id },
  })

  return updatedUserType
}

async function remove(id) {
  const deletedUserType = await UserType.destroy({
    where: { id },
  })

  return deletedUserType
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
}

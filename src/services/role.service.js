const { Op } = require('sequelize')
const db = require('./db.service')
const { listPage, listPerPage } = require("../config/general.config")

const Role = db.role;

async function create(role) {
    const data = Role.create(role)
  
    return data
  }

async function findAll(filters){
    const { name, salary, page, perPage } = filters

    let condition = {}

    if(name){
        condition.name =  { [Op.like]: `%${name}%` }
    }
    if(salary){
        condition.salary = {[Op.eq]: salary }
    }
    if(Object.keys(condition).length === 0){
        condition = null;
    }

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
  
    const result = await Role.findAndCountAll({
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
    const result = await Role.findByPk(id)
  
    return result
}
  
async function update(id, role) {
const updatedRole = await Role.update(role, {
    where: { id },
})

return updatedRole
}

async function remove(id) {
const deletedRole = await Role.destroy({
    where: { id },
})

return deletedRole
}

module.exports = {
    create,
    findAll,
    findOne, 
    update,
    remove
}

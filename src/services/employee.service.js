const { Op } = require('sequelize')
const db = require('./db.service')
const { listPage, listPerPage } = require("../config/general.config")

const Employee = db.employee
const Role = db.role;

async function create(employee) {
  const { RoleId, ...rest} = employee

    if(RoleId){
      const role = await Role.findByPk(RoleId);
      if(!role){
        return { message: "RoleId not found"}; 
      }
    }

    const data = await Employee.create(rest)
    
    if(data){
        const role = await Role.findByPk(RoleId);
        if(role){
            await data.setRole(role)
        }
    }

    return data
}

async function findAll(filters) {
    const { name, email, address, birthday, RoleId, page, perPage } = filters

    let condition = {}

    if(name){
        condition.name =  { [Op.like]: `%${name}%` }
    }
    if(email){
        condition.email = { [Op.like]: `%${email}%` }
    }
    if(address){
        condition.address = { [Op.like]: `%${address}%` }
    }
    if(birthday){
        condition.birthday =  {[Op.eq]: birthday }
    }
    if(birthday){
        condition.RoleId =  {[Op.eq]: RoleId }
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
  
    const result = await Employee.findAndCountAll({
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
  const result = await Employee.findByPk(id)

  return result
}

async function update(id, employee) {
  const updatedEmployee = await Employee.update(employee, {
    where: { id },
  })

  return updatedEmployee
}

async function remove(id) {
  const deletedupdatedEmployee = await Employee.destroy({
    where: { id },
  })

  return deletedupdatedEmployee
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
}

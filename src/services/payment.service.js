const { Op } = require('sequelize')
const db = require('./db.service')
const { listPage, listPerPage } = require("../config/general.config")

const Payment = db.payment;
const Employee = db.employee;

async function create(payment) {
    const { EmployeeId, ...rest} = payment

    const data = await Payment.create(rest)
    
    if(data){
        const employee = await Employee.findByPk(EmployeeId);

        console.log(employee)
        if(employee){
            await data.setEmployee(employee)
        }
    }

    return data
}

async function findAll(filters){
    const { amount, discount, page, perPage } = filters

    let condition = {}

    if(amount){
        condition.amount = {[Op.eq]: amount }
    }
    if(discount){
        condition.discount = {[Op.eq]: discount }
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
  
    const result = await Payment.findAndCountAll({
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
    const result = await Payment.findByPk(id)
  
    return result
}
  
async function update(id, payment) {
    const updatedPayment = await Payment.update(payment, {
        where: { id },
    })

    return updatedPayment
}

async function remove(id) {
    const deletedPayment = await Payment.destroy({
        where: { id },
    })

    return deletedPayment
}

module.exports = {
    create,
    findAll,
    findOne, 
    update,
    remove
}

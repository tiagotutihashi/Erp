const employee = require('../services/employee.service')

async function get(req, res, next) {
  try {
    const employeeList = await employee.findAll(req.query)
    res.json(employeeList)
  } catch (err) {
    res.status(400).json({ message: err.message })
    next(err)
  }
}

async function getOne(req, res, next) {
  try {
    const foundEmployee = await employee.findOne(req.params.id)

    if(foundEmployee){
      res.json(foundEmployee)
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
    next(err)
  }
}

async function create(req, res, next) {
  try {
    const { body } = req
    const createdEmployee = await employee.create(body)

    if(createdEmployee.message){
      res.status(404).json(createdEmployee)
    } else {
      res.status(201).json(createdEmployee)
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
    next(err)
  }
}

async function update(req, res, next) {
  try {
    const { body, params } = req
    const createdEmployee = await employee.update(params.id, body)
    if (createdEmployee) {
      res.status(204).send()
    } else {
      res.status(400).send()
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
    next(err)
  }
}

async function remove(req, res, next) {
  try {
    const { params } = req
    const removedEmployee = await employee.remove(params.id)
    if (removedEmployee) {
      res.status(204).send()
    } else {
      res.status(400).send()
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
    next(err)
  }
}

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
}

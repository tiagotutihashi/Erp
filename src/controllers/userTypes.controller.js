const userType = require('../services/userTypes.service')

async function get(req, res, next) {
  try {
    const userTypeList = await userType.findAll(req.query)
    res.json(userTypeList)
  } catch (err) {
    res.status(400).json({ message: err.message })
    next(err)
  }
}

async function getOne(req, res, next) {
  try {
    const foundUserType = await userType.findOne(req.params.id)

    if(foundUserType){
      res.json(foundUserType)
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
    const createdUserType = await userType.create(body)
    res.status(201).json(createdUserType)
  } catch (err) {
    res.status(400).json({ message: err.message })
    next(err)
  }
}

async function update(req, res, next) {
  try {
    const { body, params } = req
    const createdUserType = await userType.update(params.id, body)
    if (createdUserType) {
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
    const removedUserType = await userType.remove(params.id)
    if (removedUserType) {
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

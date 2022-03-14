const role = require('../services/role.service')

async function get(req, res, next) {
    try {
      const roleList = await role.findAll(req.query)
      res.json(roleList)
    } catch (err) {
      res.status(400).json({ message: err.message })
      next(err)
    }
  }

async function getOne(req, res, next) {
    try {
      const foundRole = await role.findOne(req.params.id)
  
      if(foundRole){
        res.json(foundRole)
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
      const createdRole = await role.create(body)
      res.status(201).json(createdRole)
    } catch (err) {
      res.status(400).json({ message: err.message })
      next(err)
    }
}

async function update(req, res, next) {
    try {
      const { body, params } = req
      const updatedRole = await role.update(params.id, body)
      if (updatedRole) {
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
      const removedRole = await role.remove(params.id)
      if (removedRole) {
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
  
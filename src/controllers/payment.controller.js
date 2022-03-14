const payment = require('../services/payment.service')

async function get(req, res, next) {
    try {
      const paymentList = await payment.findAll(req.query)
      res.json(paymentList)
    } catch (err) {
      res.status(400).json({ message: err.message })
      next(err)
    }
  }

async function getOne(req, res, next) {
    try {
      const foundPayment = await payment.findOne(req.params.id)
  
      if(foundPayment){
        res.json(foundPayment)
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
      const createdPayment = await payment.create(body)
      if(createdPayment.message){
        res.status(404).json(createdPayment)
      } else {
        res.status(201).json(createdPayment)
      }
    } catch (err) {
      res.status(400).json({ message: err.message })
      next(err)
    }
}

async function update(req, res, next) {
    try {
      const { body, params } = req
      const updatedPayment = await payment.update(params.id, body)
      if (updatedPayment) {
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
      const removedPayment = await payment.remove(params.id)
      if (removedPayment) {
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
  
const user = require("../services/user.service")

async function signup(req, res, next){
    try {
        const { body } = req;
        const createdUser = await user.create(body);
        res.status(201).json(createdUser)
      } catch (err) {
        res.status(400).json({ message: err.message })
        next(err)
      }
}

async function signin(req, res, next){
    try {
        const { body } = req;
        await user.login(res, body);
      } catch (err) {
        res.status(400).json({ message: err.message })
        next(err)
      }
}

module.exports = {
    signup,
    signin
}

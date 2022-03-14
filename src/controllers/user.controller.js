const user = require("../services/user.service")

async function signup(req, res, next){
    try {
        const { body } = req;
        const createdUser = await user.create(body);

        if(createdUser.message){
          res.status(400).json({message: createdUser.message })
        } else {
          res.status(201).json(createdUser)
        }

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

async function update(req, res, next){
  try {
    const { body, params } = req;
    await user.update(
      res,
      params.id, 
      body, 
      req.userId
    );
  } catch (err) {
    res.status(400).json({ message: err.message })
    next(err)
  }
}

module.exports = {
    signup,
    signin,
    update
}

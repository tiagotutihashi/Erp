const { Sequelize } = require('sequelize')
const dbConfig = require('../config/db.config')

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.userType = require('../models/userTypes.model.js')(sequelize)
db.user = require('../models/user.model.js')(sequelize)

db.userType.hasMany(db.user)
db.user.belongsTo(db.userType, { as: 'UserType', constraints: false })

module.exports = db

const express = require('express')
const app = express()
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const port = 3000
const { initial } = require("./src/utils/seedbd.util")

// Routes
const userTypessRouter = require('./src/routes/userTypes.route');
const usersRouter = require('./src/routes/user.route')
const rolesRouter = require('./src/routes/role.route')
const employeesRouter = require("./src/routes/employee.route")
const paymentsRouter = require("./src/routes/payment.route")

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Tiago Tutihashi - ERP API')
})

// Sequelize
const db = require("./src/services/db.service.js");
// Without reset data base
db.sequelize.sync();

// Reset Data base and insert initial data
// db.sequelize.sync({force: true}).then(() => {
//   initial();
// });

//Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ERP Express API with Swagger",
      description:
        "This is a ERP API application made with Express and documented with Swagger",
    },
    components:{
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT"
        },
      }
    },
    security: [{
      jwt: []
    }]
  },
  apis: ["./src/routes/*.js"],
};
const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

// Router
app.use("/userTypes", userTypessRouter)
app.use('/users', usersRouter)
app.use('/roles', rolesRouter)
app.use('/employees', employeesRouter)
app.use("/payments", paymentsRouter);

// Listen
app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})
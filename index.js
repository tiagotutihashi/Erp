const express = require('express')
const app = express()
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const port = 3000

// Routes
const userTypessRouter = require('./src/routes/userTypes.route');
const usersRouter = require('./src/routes/user.route')

const corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Tiago Tutihashi - ERP API')
})

// Sequelize
const db = require("./src/services/db.service.js");
db.sequelize.sync();

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
app.use('/user', usersRouter)

// Listen
app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})
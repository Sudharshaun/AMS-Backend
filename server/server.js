const express = require('express')
const router = express.Router();
const app = express()
const port = 3000

const connection = require("./db/model");
require("dotenv").config();
const institution = require('./institution/institution')
const user = require('../server/user/auth')
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');


app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

app.use(express.json());

app.get('/user/:id',  user.getUser)
app.post('/user', user.addUser)
app.get('/institution/:id', institution.getInstitution)
app.post('/institution', institution.addInstitution)

app.listen(port);
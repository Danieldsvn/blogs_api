const express = require('express');
const validateJWT = require('../middlewares/validateJWT');

const LoginController = require('./controllers/loginController');
const UserController = require('./controllers/userController');
const CategoryController = require('./controllers/categoryController');
// ...

const app = express();

app.use(express.json());

app.post('/login', LoginController.Login);
app.post('/user', UserController.Create);
app.get('/user', validateJWT, UserController.GetAll);
app.get('/user/:id', validateJWT, UserController.GetById);
app.post('/categories', validateJWT, CategoryController.Create);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

const express = require('express');
const validateJWT = require('../middlewares/validateJWT');

const LoginController = require('./controllers/loginController');
const UserController = require('./controllers/userController');
const CategoryController = require('./controllers/categoryController');
const BlogPostController = require('./controllers/blogPostController');
// ...

const app = express();

app.use(express.json());

app.post('/login', LoginController.Login);
app.post('/user', UserController.Create);
app.get('/user', validateJWT, UserController.GetAll);
app.get('/user/:id', validateJWT, UserController.GetById);
app.post('/categories', validateJWT, CategoryController.Create);
app.get('/categories', validateJWT, CategoryController.GetAll);
app.post('/post', validateJWT, BlogPostController.Create);
app.get('/post', validateJWT, BlogPostController.GetAll);
app.get('/post/:id', validateJWT, BlogPostController.GetById);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

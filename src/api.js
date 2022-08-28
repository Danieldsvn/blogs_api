const express = require('express');

const LoginController = require('./controllers/loginController');
// ...

const app = express();

app.use(express.json());

app.post('/login', LoginController.Login);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

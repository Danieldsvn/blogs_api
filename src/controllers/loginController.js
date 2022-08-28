const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const secret = 'suaSenhaSecreta';

const validateBody = (body) => {
  const { email, password } = body;

  if (!email || !password) return false;

  return true;
};

const Login = async (request, response) => {
  const { email, password } = request.body;
  if (!(validateBody(request.body))) {
    return response.status(400).json({ message: 'Some required fields are missing' });
  }
  const user = await User.findOne({ where: { email } });
  
  if (!user || user.password !== password) {
    return response.status(400).json({ message: 'Invalid fields' });
  }

  const jwtConfig = {
    expiresIn: '8h',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return response.status(200).json({ token });
};

module.exports = {
  Login,
};
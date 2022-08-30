require('dotenv').config();

const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const secret = process.env.JWT_SECRET;

const validateEmail = (email) => {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]/i;
  const isValid = emailRegex.test(email);
  if(!isValid) return false;

  return true;
};

const validateNewUser = (request) => {
  const { displayName, email, password, image } = request.body;
  if (displayName.length < 8) {    
    return { valid: false, code: 400, message: '"displayName" length must be at least 8 characters long' };
  }
  if (password.length < 6) {
    return { valid: false, code: 400, message: '"password" length must be at least 6 characters long' };
  }
  if (!(validateEmail(email))) {
    return { valid: false, code: 400, message: '"email" must be a valid email' };
  }
  return { valid: true };
};


const Create = async (request, response) => {
  const { displayName, email, password, image } = request.body;
  if(!(validateNewUser(request).valid)) {
    const { code, message } = validateNewUser(request);
    return response.status(code).json({ message });
  }
  console.log(`email: ${email}`);
  const emailFound = await User.findOne({ where: { email }});  
  if(emailFound) {
    return response.status(409).json({ message:'User already registred' });
  }

  const user = {
    displayName,
    email,   
    image,  
  };

  const jwtConfig = {
    expiresIn: '8h',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: user }, secret, jwtConfig);

  return response.status(201).json({ token });
};

module.exports = {
  Create,
};
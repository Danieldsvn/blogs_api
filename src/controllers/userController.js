require('dotenv').config();

const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const secret = process.env.JWT_SECRET;

const validateEmail = (email) => {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]/i;
  const isValid = emailRegex.test(email);
  if (!isValid) return false;

  return true;
};

const displayNameMessage = '"displayName" length must be at least 8 characters long';
const passwordMessage = '"password" length must be at least 6 characters long';
const emailMessage = '"email" must be a valid email';

const validateNewUser = (request) => {
  const { displayName, email, password } = request.body;
  if (displayName.length < 8) {    
    return { valid: false, code: 400, message: displayNameMessage };
  }
  if (password.length < 6) {
    return { valid: false, code: 400, message: passwordMessage };
  }
  if (!(validateEmail(email))) {
    return { valid: false, code: 400, message: emailMessage };
  }
  return { valid: true };
};

const Create = async (request, response) => {
  const { displayName, email, image } = request.body;
  if (!(validateNewUser(request).valid)) {
    const { code, message } = validateNewUser(request);
    return response.status(code).json({ message });
  }  
  const emailFound = await User.findOne({ where: { email } }); 
  console.log(`emailFound: ${emailFound}`); 
  if (emailFound !== null) {
    return response.status(409).json({ message: 'User already registred' });
  }

  const user = { displayName, email, image };

  const jwtConfig = { expiresIn: '8h', algorithm: 'HS256' };
  const token = jwt.sign({ data: user }, secret, jwtConfig);

  return response.status(201).json({ token });
};

const GetAll = async (request, response) => {
  try {
    const users = await User.findAll();
    const usersWithoutPassword = users.map((user) => (
      {
        id: user.id,
        displayName: user.displayName,
        email: user.email,
        image: user.image,
      }
    ));
    return response.status(200).json(usersWithoutPassword);
  } catch (err) {
    return response.status(500).json({ message: 'Server error' });
  }  
};

const GetById = async (request, response) => {
  const { id } = request.params;
  try {
    const user = await User.findOne({ where: { id } });
    if (user === null) {
      return response.status(404).json({ message: 'User does not exist' });
    }
    const userWithoutPassword = {
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      image: user.image,
    };
    return response.status(200).json(userWithoutPassword);
  } catch (err) {
    return response.status(500).json({ message: 'Server error' });
  }  
};

module.exports = {
  Create,
  GetAll,
  GetById,
};
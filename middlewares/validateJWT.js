require('dotenv').config();
const jwt = require('jsonwebtoken');

const { User } = require('../src/database/models');

const secret = process.env.JWT_SECRET;

module.exports = async (request, response, next) => {  
  const token = request.headers.authorization;  
  if (!token) {
    return response.status(401).json({ message: 'Token not found' });
  }

  try {    
    const decoded = jwt.verify(token, secret);    

    const user = await User.findOne({ where: { displayName: decoded.data.displayName } });
    
    if (!user) {
      return response
        .status(401)
        .json({ message: 'User not found.' });
    }
    
    request.displayName = user;
    
    next();
  } catch (err) {
    return response.status(401).json({ message: 'Expired or invalid token' });
  }
};
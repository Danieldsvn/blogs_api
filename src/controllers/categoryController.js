const { Category } = require('../database/models');

const Create = async (request, response) => {
  const { name } = request.body;
  try {
    if (!name || name.length === 0) {
      return response.status(400).json({ message: '"name" is required' });
    }
    const newCategory = await Category.create({ name });
    return response.status(201).json(newCategory);
  } catch (err) {
    return response.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  Create,
};

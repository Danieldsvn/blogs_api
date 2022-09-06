const { Category, BlogPost } = require('../database/models');

const ValidateCategoryIds = async (ids) => {    
  const idDoesntExist = ids.every(async (id) => {
   const result = await Category.findOne({ where: { id } });
   console.table(`result: ${result}`);
   return result === undefined;
  });
  if (idDoesntExist) return { valid: false };
  return { valid: true };
};

const ValidateBody = (request) => {
  const { title, content, categoryIds } = request.body;
  if (!title || !content) {
    return { valid: false, code: 400, message: 'Some required fields are missing' };
  }
  if (!(ValidateCategoryIds(categoryIds).valid)) {
    return { valid: false, code: 400, message: '"categoryIds" not found' };
  }
  return { valid: true };
};

const Create = async (request, response) => {
  try {
    const { title, content, categoryIds } = request.body;
    if (!(ValidateBody(request).valid)) {
      const { code, message } = ValidateBody(request);
      return response.status(code).json({ message });
    }

    const newPost = await BlogPost.create({
      title,
      content,
      categoryIds: [...categoryIds],
    });

    return response.status(201).json(newPost);
  } catch (err) {
    return response.status(500).json({ message: 'Something gone wrong' });
  }
};

module.exports = {
  Create,
};

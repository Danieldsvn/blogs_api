const { Category, BlogPost } = require('../database/models');


const ValidateCategoryIds = async (ids) => {
  let isValid = { valid: true };
   Promise.all(ids.every(async (id) => {
    await Category.findOne(id) === undefined;
  })).then((value) => isValid = { valid: !value });
  return isValid;
}

const ValidateBody = (request) => {
  const { title, content, categoryIds } = request.body;
  if (!title || !content) {
    return { valid: false, code: 400, message: 'Some required fields are missing' };
  }
  if(!(ValidateCategoryIds(categoryIds).valid)) {
    return { valid: false, code: 400, message: '"categoryIds" not found' }
  }
};

const Create = async (request, response) => {
  try {
  const { title, content, categoryIds } = request.body;
  if(!(ValidateBody(request).valid)) {
    const { code, message } = ValidateBody(request);
    return response.status(code).json({ message });
  }
  const newPost = await BlogPost.create({
    title,
    content,
    categoryIds: [...categoryIds],
  })
} catch (err) {
  return response.status(500).json({ message: 'Something gone wrong'});
}

};

module.exports = {
  Create,
};

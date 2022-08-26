const PostCategory = (sequelize, Datatypes) => {
  const PostCategory = sequelize.define("PostCategory", {    
    postId: Datatypes.INTEGER,
    categoryId: Datatypes.INTEGER,   
  });

  return PostCategory;
};

module.exports = PostCategory;
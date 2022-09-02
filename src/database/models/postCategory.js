const PostCategory = (sequelize, Datatypes) => {
  const PostCategory = sequelize.define('PostCategory', { 
    postId: {
      type: Datatypes.INTEGER,
      references: {
        model: 'BlogPost',
        key: 'id'
        }
      },
    categoryId: {
      type: Datatypes.INTEGER,
      references: {
        model: 'Category', 
        key: 'id'
      },     
    },     
  });

    PostCategory.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category, {
        as: 'categories',
        through: PostCategory,
        foreignKey: 'post_id',
        otherKey: 'category_id',
      });
      models.Category.belongsToMany(models.BlogPost, {
        as: 'posts',
        through: PostCategory,
        foreignKey: 'category_id',
        otherKey: 'post_id',
      });
    };
    return PostCategory;
};

module.exports = PostCategory;

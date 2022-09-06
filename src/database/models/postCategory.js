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
  }, {
    timestamps: false,
  });

    PostCategory.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category, {
        as: 'categories',
        through: PostCategory,
        foreignKey: 'postId',        
      });
      models.Category.belongsToMany(models.BlogPost, {
        as: 'posts',
        through: PostCategory,
        foreignKey: 'categoryId',        
      });
    };
    return PostCategory;
};

module.exports = PostCategory;

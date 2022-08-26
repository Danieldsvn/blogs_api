const BlogPost = (sequelize, Datatypes) => {
  const BlogPost = sequelize.define("BlogPost", {
    title: Datatypes.STRING,
    content: Datatypes.STRING,
    userId: Datatypes.INTEGER,
    published: Datatypes.DATE,
    updated: Datatypes.DATE,    
  });

  return BlogPost;
};

module.exports = BlogPost;
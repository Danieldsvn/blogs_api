const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: DataTypes.STRING,   
  });

  return Category;
};

module.exports = Category;
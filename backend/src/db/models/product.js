'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        onDelete: 'CASCADE',
      })
      Product.hasOne(models.Review, {
        foreignKey: 'productId',
      });
      Product.hasOne(models.Wish, {
        foreignKey: 'productId',
      });
    }
  }
  Product.init({
    categoryId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    image: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    discount: DataTypes.DECIMAL,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
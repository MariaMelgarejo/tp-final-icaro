'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wish.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      })
      Wish.belongsTo(models.Product, {
        foreignKey: 'productId',
        onDelete: 'CASCADE',
      })
    }
  }
  Wish.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Wish',
  });
  return Wish;
};
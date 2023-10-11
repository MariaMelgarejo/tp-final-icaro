'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shipping.belongsTo(models.Order, {
        foreignKey: 'orderId',
        onDelete: 'CASCADE',
      })
    }
  }
  Shipping.init({
    orderId: DataTypes.INTEGER,
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    apartment: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Shipping',
  });
  return Shipping;
};
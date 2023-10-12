'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      Order.hasOne(models.Shipping, {
        foreignKey: 'orderId',
      });
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    products: DataTypes.TEXT,
    total: DataTypes.DECIMAL,
    status: DataTypes.ENUM('pending', 'delivered', 'returned', 'sent')
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
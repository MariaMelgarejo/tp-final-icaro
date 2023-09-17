'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Address, {
        foreignKey: 'userId',
      });
      User.hasOne(models.Contact, {
        foreignKey: 'userId',
      });
      User.hasOne(models.Cart, {
        foreignKey: 'userId',
      });
      User.hasOne(models.Order, {
        foreignKey: 'userId',
      });
      User.hasOne(models.Review, {
        foreignKey: 'userId',
      });
    }
  }
  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
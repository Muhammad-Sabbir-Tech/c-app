'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_permission.init({
    purchase_read: DataTypes.STRING,
    purchase_write:{
      type:DataTypes.STRING
    },
    purchase_delete:{
      type:DataTypes.STRING
    },
    expense_read:{
      type:DataTypes.STRING
    },
    expense_write:{
      type:DataTypes.STRING
    },
    expense_delete:{
      type:DataTypes.STRING
    },
    admin_read:{
      type:DataTypes.STRING
    },
    admin_write:{
      type:DataTypes.STRING
    },
    admin_delete:{
      type:DataTypes.STRING
    },
    user_id:{
      type:DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'user_permission',
  });
  return user_permission;
};
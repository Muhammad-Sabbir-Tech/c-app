'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  expence.init({
    bill_no: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    expence_tag: {
      type: DataTypes.STRING
    },
    expence_detail: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    quantity: {
      type: DataTypes.STRING
    },
    unit_type: {
      type: DataTypes.STRING
    },
    expence_ammount: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    project_id:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
  }, {
    sequelize,
    modelName: 'expence',
  });
  return expence;
};
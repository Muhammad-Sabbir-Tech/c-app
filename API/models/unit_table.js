'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unit_table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  unit_table.init({
    unit_name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    unit_lable: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    unit_per_lable: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    item_id:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    }
  }, {
    sequelize,
    modelName: 'unit_table',
  });
  return unit_table;
};
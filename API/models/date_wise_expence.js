'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class date_wise_expence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  date_wise_expence.init({
    date: {
      type: DataTypes.DATEONLY,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    bill_no:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    total_expence_amount:{
      type:DataTypes.STRING,
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
    user_id:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
  }, {
    sequelize,
    modelName: 'date_wise_expence',
  });
  return date_wise_expence;
};
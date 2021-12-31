'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class all_project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  all_project.init({
    project_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    owner_name: {
      type: DataTypes.STRING,
      defaultValue : "N/A"
    },
    owner_phn: {
      type: DataTypes.STRING,
      defaultValue : "N/A"
    },
    project_location: {
      type: DataTypes.STRING,
      defaultValue : "N/A"
    },
    project_ammount: {
      type: DataTypes.STRING,
      defaultValue : "N/A"
    },
    total_expence: {
      type: DataTypes.STRING,
      defaultValue : "N/A"
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    deadline: {
      type: DataTypes.DATEONLY,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue:"1",
      comment:"1=working, 0=finished, blank=deni"
    },
    creator_id: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
  }, {
    sequelize,
    modelName: 'all_project',
  });
  return all_project;
};



'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('expences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bill_no: {
        type: Sequelize.STRING,
        allowNull:false
      },
      expence_tag: {
        type: Sequelize.STRING
      },
      expence_detail: {
        type: Sequelize.STRING,
        allowNull:false
      },
      quantity: {
        type: Sequelize.STRING
      },
      unit_type: {
        type: Sequelize.STRING
      },
      expence_ammount: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      project_id:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
          notNull:true,
          notEmpty:true
        }
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('expences');
  }
};
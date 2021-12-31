'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('date_wise_expences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      bill_no:{
        type:Sequelize.STRING,
        allowNull:false
      },
      total_expence_amount:{
        type:Sequelize.STRING,
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
      user_id:{
        type:Sequelize.STRING,
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
    await queryInterface.dropTable('date_wise_expences');
  }
};
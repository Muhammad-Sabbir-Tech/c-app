'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      job_possition:{
        type : Sequelize.STRING,
      },
      sallery : {
        type : Sequelize.FLOAT,
      },
      mobile_no : {
        type : Sequelize.STRING
      },
      user_name :{
        type : Sequelize.STRING,
        allowNull : false
      },
      password : {
        type : Sequelize.STRING,
        allowNull : false
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
    await queryInterface.dropTable('users');
  }
};
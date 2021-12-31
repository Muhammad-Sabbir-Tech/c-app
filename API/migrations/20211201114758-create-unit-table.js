'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('unit_tables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      unit_name: {
        type: Sequelize.STRING
      },
      unit_lable: {
        type: Sequelize.STRING,
        allowNull:false
      },
      unit_per_lable: {
        type: Sequelize.STRING,
        allowNull:false
      },
      item_id:{
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
    await queryInterface.dropTable('unit_tables');
  }
};
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      purchase_read: {
        type: Sequelize.STRING
      },
      purchase_write:{
        type:Sequelize.STRING
      },
      purchase_delete:{
        type:Sequelize.STRING
      },
      expense_read:{
        type:Sequelize.STRING
      },
      expense_write:{
        type:Sequelize.STRING
      },
      expense_delete:{
        type:Sequelize.STRING
      },
      admin_read:{
        type:Sequelize.STRING
      },
      admin_write:{
        type:Sequelize.STRING
      },
      admin_delete:{
        type:Sequelize.STRING
      },
      user_id:{
        type:Sequelize.STRING
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
    await queryInterface.dropTable('user_permissions');
  }
};
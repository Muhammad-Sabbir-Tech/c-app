'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('all_projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      owner_name: {
        type: Sequelize.STRING,
        defaultValue : "N/A"
      },
      owner_phn: {
        type: Sequelize.STRING,
        defaultValue : "N/A"
      },
      project_location: {
        type: Sequelize.STRING,
        defaultValue : "N/A"
      },
      project_ammount: {
        type: Sequelize.STRING,
        defaultValue : "N/A"
      },
      total_expence: {
        type: Sequelize.STRING,
        defaultValue : "N/A"
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      deadline: {
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      status: {
        type: Sequelize.STRING,
        defaultValue:"1",
        comment:"1=working, 0=finished, blank=deni"
      },
      creator_id: {
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
    await queryInterface.dropTable('all_projects');
  }
};
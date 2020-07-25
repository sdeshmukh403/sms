'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable(
        'transports',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          route_name: Sequelize.STRING,
          vehicle_no: Sequelize.STRING,
          driver_name: Sequelize.STRING,
          liences_no: Sequelize.STRING,
          phone_no: Sequelize.STRING,
          createdAt: {
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          }
        }
      )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropAllTables()

  }
};

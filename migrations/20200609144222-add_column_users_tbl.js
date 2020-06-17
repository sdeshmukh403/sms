'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        firstname: Sequelize.STRING,
        lastname: Sequelize.STRING,
        gender:  Sequelize.BOOLEAN,
        class:  Sequelize.INTEGER,    
        section:  Sequelize.STRING,       
        address:  Sequelize.TEXT,
        phone:  Sequelize.INTEGER,
        email:  Sequelize.STRING,
        dob:  Sequelize.DATE,
        password: Sequelize.TEXT,
        roll_no:Sequelize.INTEGER
      }
    ) 
  },

  down: (queryInterface, Sequelize) => {
  
  }
};

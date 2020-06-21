const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize_connection');
var Student = sequelize.define('users', {
    
    name:Sequelize.STRING,
    board: Sequelize.INTEGER,
    class: Sequelize.INTEGER
    
});
module.exports = Student;

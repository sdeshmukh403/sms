const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize_connection');
var Subject = sequelize.define('subjects', {
    
    name:Sequelize.STRING,
    board: Sequelize.INTEGER,
    class: Sequelize.INTEGER
    
});
module.exports = Subject;


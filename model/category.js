const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize_connection');

var Category = sequelize.define('categories', {
    
    name:Sequelize.STRING
    
});
module.exports = Category;



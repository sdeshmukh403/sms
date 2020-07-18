const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize_connection');
var Notice = sequelize.define('notices', {
    
    title:Sequelize.STRING,
    description: Sequelize.TEXT,
    created_by: Sequelize.INTEGER
    
});
module.exports = Notice;
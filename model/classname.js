const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize_connection');

var ClassName = sequelize.define('classes', {    
    name:Sequelize.STRING    
});
module.exports = ClassName;

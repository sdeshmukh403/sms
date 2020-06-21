const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize_connection');
var Religion = sequelize.define('religions', {    
    name:Sequelize.STRING    
});
module.exports = Religion;

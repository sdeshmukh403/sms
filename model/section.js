const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize_connection');
var Section = sequelize.define('sections', {    
    name:Sequelize.STRING    
});
module.exports = Section;

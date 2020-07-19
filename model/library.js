const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize_connection');
var Library = sequelize.define('library', {    
    book_name:Sequelize.STRING,
    subject:Sequelize.STRING,
    writer: Sequelize.STRING,
    class: Sequelize.INTEGER,
    published: Sequelize.STRING,
    creating_date: Sequelize.DATE
});
module.exports = Library;
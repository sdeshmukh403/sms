const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize_connection');
const User = require('./user');

var ClassName = sequelize.define('classes', {    
    name:Sequelize.STRING    
}, {
    classMethods: {
        associate: function(models) {
            ClassName.belongsTo( User );
        }
    }
});


module.exports = ClassName;

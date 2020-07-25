const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize_connection');
var Notice = sequelize.define('transports', {
    route_name: Sequelize.STRING,
    vehicle_no: Sequelize.STRING,
    driver_name: Sequelize.STRING,
    liences_no: Sequelize.STRING,
    phone_no: Sequelize.STRING,
    
});
module.exports = Notice;
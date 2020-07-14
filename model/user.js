const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize_connection');
const ClassName = require('./classname');
const Section = require('./section');
var User = sequelize.define('users', {
    firstname:{
        type: Sequelize.STRING
    },
    lastname: { 
        type: Sequelize.STRING, 
    },
    gender:{
        type:Sequelize.STRING
    }, 
    class:{
        type:Sequelize.INTEGER
    },  
    image:{
        type:Sequelize.STRING
    },   
    section_id:{
        type:Sequelize.INTEGER
    },
    class:{
        type:Sequelize.INTEGER
    },
    phone:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },
    dob:{
        type:Sequelize.DATE
    },
    roll_no:{
        type:Sequelize.STRING  
    },
    password:{
        type:Sequelize.STRING
    },
    role:{
        type:Sequelize.STRING
    },
    religion:{
        type:Sequelize.INTEGER
    },
    admission_date:{
        type:Sequelize.DATE
    },
    admission_id:{
        type:Sequelize.INTEGER
    },
    blood_grp:{
        type:Sequelize.STRING
    },
    description:{
        type:Sequelize.TEXT
    }
 } );


module.exports = User;

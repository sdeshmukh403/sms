const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize_connection');

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
    subject:{
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
    teacher_id:{
        type:Sequelize.INTEGER
    },
    blood_grp:{
        type:Sequelize.STRING
    },
    description:{
        type:Sequelize.TEXT
    },
    address:{
        type:Sequelize.TEXT
    },
    father_occupation:{
        type:Sequelize.STRING
    }
 } );


module.exports = User;

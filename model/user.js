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
        type:Sequelize.INTEGER
    }, 
    class:{
        type:Sequelize.INTEGER
    },    
    section:{
        type:Sequelize.STRING
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
    date:{
        type:Sequelize.DATE
    },
    roll_no:{
        type:Sequelize.STRING  
    },
    password:{
        type:Sequelize.STRING
    },
    class:{
        type:Sequelize.INTEGER
    },
    religion:{
        type:Sequelize.INTEGER
    },
    admission_date:{
        type:Sequelize.DATE
    },
    blood_grp:{
        type:Sequelize.STRING
    },
    description:{
        type:Sequelize.TEXT
    }
});

module.exports = User;

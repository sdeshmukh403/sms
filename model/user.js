const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize_connection');
let Section  = require('../model/section');
let ClassName  = require('../model/classname');
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
    },
    parent_id:{
        type:Sequelize.INTEGER
    }
 } );

 User.belongsTo(Section,{foreignKey: 'section_id', sourceKey: 'id'});
 Section.hasOne(User,{foreignKey: 'section_id', targetKey: 'id'}); 
 
 User.belongsTo(ClassName,{as:'classname', foreignKey: 'class', sourceKey: 'id'});
 ClassName.hasOne(User,{foreignKey: 'class', targetKey: 'id'});

 User.belongsTo(User,{as: 'parent' , foreignKey: 'parent_id', sourceKey: 'id'});
 User.hasOne(User,{foreignKey: 'parent_id', targetKey: 'id'});
 

module.exports = User;

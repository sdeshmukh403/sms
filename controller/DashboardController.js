let User  = require('../model/user');
let noticeController  = require('../controller/NoticeController');
const sequelize = require('../database/sequelize_connection');
let Notice = require('../model/notice');
let Constant = require('../model/constant');
let Section  = require('../model/section');
let ClassName   = require('../model/classname');

common_variables = [{role: localStorage.getItem('role'), 
profileimg : localStorage.getItem('profileImg' ),
username:localStorage.getItem('loginUser'),
Constant: require('../model/constant')
}]
exports.getAdminDashboard = (req, res) =>{   
 //res.render('admin-dashboard', {  });
    User.count({
        where:{role:3}
        }).then(function(students_count){
            User.count({
                where:{role:3,gender:"M"}
                }).then(function(students_male_count){
                    User.count({
                        where:{role:3,gender:"F"}
                        }).then(function(students_female_count){
                            User.count({
                                where:{role:4}
                                }).then(function(parents_count){
                                    User.count({
                                        where:{role:2}
                                        }).then(function(teachers_count){
                                            Notice.findAll({
                                                attributes:['title', 'description', 'created_by', 'createdAt'], order: [
                                                ['id', 'DESC']
                                            ] , raw:true}).then(function (result) { 
                                                var class_color = ["bg-skyblue","bg-yellow","bg-pink"];
                                                common_variables = [{role: localStorage.getItem('role'), 
                                                profileimg : localStorage.getItem('profileImg' ),
                                                username:localStorage.getItem('loginUser'),
                                                Constant: require('../model/constant')
                                              }]
                                            
                                                data = {helper:require('../public/helper'), notice_datas:result,
                                                students_count:students_count,parents_count:parents_count,
                                                teachers_count:teachers_count,students_male_count:students_male_count,
                                                students_female_count:students_female_count,common_variables
                                                }
            res.render('admin-dashboard', data);
        });   
        });
    });
    });
    });
});
}

exports.getStudentDashboard = (req, res) =>{
    common_variables = [{role: localStorage.getItem('role'), 
    profileimg : localStorage.getItem('profileImg' ),
    username:localStorage.getItem('loginUser'), 
    Constant: require('../model/constant')
  }]
  data = {title:'Student Dashboard', helper:require('../public/helper'), main_heading:'Student Dashboard', 
   common_variables
  }
    res.render('student-dashboard', data);
} 

exports.getTeacherDashboard = (req, res) =>{
  
  User.findAll({where:{teacher_id: localStorage.getItem('UserId')}, raw:true,   include: [{
    model: Section,
    required: true
   },{
    model: User ,
    as: 'parent',
    required: false
   },{
    model: ClassName ,
    as: 'classname',
    required: false
   }] }).then(function(students){
    data = {helper:require('../public/helper'), main_heading:'Student Dashboard', 
    common_variables, students
   }
    res.render('teacher-dashboard', data);
   });
} 
 
exports.getParentDashboard = (req, res) =>{
User.findAll({where:{parent_id: localStorage.getItem('UserId')}, raw:true,  include: [{
    model: Section,
    required: true
   },{
    model: ClassName ,
    as: 'classname',
    required: false
   }] }).then(function(children){
    data = {helper:require('../public/helper'), main_heading:'Parent Dashboard', 
    sub_heading:'Parent ', common_variables, children
    }
    res.render('parent-dashboard', data);
})    
} 
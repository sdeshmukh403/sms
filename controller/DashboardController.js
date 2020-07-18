let User  = require('../model/user');
const sequelize = require('../database/sequelize_connection');
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
            res.render('admin-dashboard',{helper:require('../public/helper'),
            students_count:students_count,parents_count:parents_count,teachers_count:teachers_count,students_male_count:students_male_count,students_female_count:students_female_count});
        });
    });
    });
    });
});
}
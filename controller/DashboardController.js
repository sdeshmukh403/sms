let User  = require('../model/user');

exports.getAdminDashboard = (req, res) =>{
    User.count({
        where:{role:3}
        }).then(function(students_count){
            User.count({
                where:{role:3,gender:"M"}
                }).then(function(students_male_count){
                    User.count({
                        where:{role:3,gender:"F"}
                        }).then(function(students_female_count){
            res.render('admin-dashboard',{students_count:students_count,students_male_count:students_male_count,students_female_count:students_female_count});
        });
    });
    });
}
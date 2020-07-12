let User     = require('../model/user');
let Constant = require('../model/constant');

exports.getParentList = (req, res) =>{
    User.findAll({where:{role:Constant.PARENT},attributes:['id', 'firstname','lastname', 'roll_no', 'gender', 'section','address', 'dob', 'phone', 'email', 'class'] ,raw:true}).then(function (result) { 
        res.render('all-parents', {title: 'Parent', data: result });  
      });    
}

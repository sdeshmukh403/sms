let User     = require('../model/user');
let Constant = require('../model/constant');
var express  = require('express');
const router = express.Router();

exports.getTeacherList = (req, res) =>{
    User.findAll({where:{role:Constant.TEACHER},attributes:['id', 'firstname','lastname', 'roll_no', 'gender', 'section','address', 'dob', 'phone', 'email', 'class'] ,raw:true}).then(function (result) { 
        res.render('all-teachers', {title: 'Teacher', data: result });  
      });    
}

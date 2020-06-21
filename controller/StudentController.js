let User     = require('../model/user');
let Constant = require('../model/constant');
var express  = require('express');
const router = express.Router();

exports.getStudentList = (req, res) =>{
    User.findAll({where:{role:Constant.STUDENT},attributes:['id', 'firstname','lastname', 'roll_no', 'gender', 'section','address', 'dob', 'phone', 'email', 'class'] ,raw:true}).then(function (result) { 
         res.render('all-students', {title: 'Student', helper:require('../public/helper'), main_heading:'All Students', sub_heading:'All student data', data: result });  
      });    
}

exports.getStudentDetail = (req, res) =>{ 
    User.findAll({where:{id:req.params.id}, attributes: ['id', 'firstname', 'lastname','roll_no', 'gender', 'section','address', 'dob', 'phone', 'email', 'class'], raw:true}).then(function (result) { 
        res.render('student-details', {title: 'Student', main_heading:'All Students', sub_heading:'All student data', data: result[0] });  
     });
}

exports.getStudentAdmissionForm = (req, res) => {
    res.render('admit-form', {title: 'Student',  main_heading:'Student Admit Form', sub_heading:'Add New Student'});
}

exports.postStudentAdmissionForm = (req, res) => {
    User.create({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        class:req.body.class,
        section:req.body.section,
        roll_no:req.body.roll_no,
        admission_id:req.body.admission_id,
        description:req.body.description,
        religion:req.body.religion,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender,
        dob:req.body.dob
      }).then(result=>{
        return res.redirect('all-students'); 
      }).catch(err => {
        return res.redirect('all-students');
   })}
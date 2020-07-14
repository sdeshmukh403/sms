let User     = require('../model/user');
let Constant = require('../model/constant');
var express  = require('express');
const multer = require('multer');
let Religion   = require('../model/religion');
let CommonController = require('./CommonController');
let Section  = require('../model/section');


exports.getTeacherList = (req, res) =>{
  filterWhere ={role:Constant.TEACHER};
  if(req.query.roll_no||req.query.firstname||req.query.classname){
    if(req.query.roll_no) filterWhere.roll_no =req.query.roll_no;
    if(req.query.firstname) filterWhere.firstname =req.query.firstname;
    if(req.query.classname) filterWhere.class =req.query.classname;  
  }
    User.findAll({where: filterWhere,
      attributes:['id', 'image', 'firstname','lastname', 'roll_no', 'gender', 'section_id','address', 'dob', 'phone', 'email', 'class'] ,
      raw:true,
      order: [
        ['id', 'DESC']
    ]}).then(function (datas) { 
        res.render('all-teachers', {title: 'Teacher',  msg: req.flash('success-msg'),
        helper:require('../public/helper'),
        main_heading:'All Teachers', sub_heading:'All Teacher data', datas: datas });   
      });    
}

//view
exports.getTeacherDetail = (req, res) =>{ 
  User.findAll({where:{id:req.params.id}, attributes: ['id', 'firstname', 'image', 'lastname','roll_no', 'gender', 'section_id','address', 'dob', 'phone', 'email', 'class'], raw:true}).then(function (result) { 
      res.render('teacher-details', {title: 'Teacher', main_heading:'View teacher detail',list_heading:'All Teachers',
      list_url: '/all-teachers', sub_heading:'View teacher detail', data: result[0] });  
   });
}

//edit

exports.getTeacherAdmissionForm = (req, res) => {
  Religion.findAll({attributes:['id', 'name'] ,raw:true}).then(function (religions) {
  Section.findAll({attributes:['id', 'name'] ,raw:true}).then(function (sections) {
    CommonController.getClassnameData().then(function (classnames) {
      data = {  title: 'Teacher',  
                list_heading:'All Teachers',
                list_url: '/all-teachers',
                main_heading:'Teacher Admit Form',
                sub_heading:'Add New Teacher',
                sections:sections,
                religions:religions,
                classnames:classnames
              }

    res.render('admit-form',  data );
  });    
});
  });
  }

  var storage = multer.diskStorage(
    {
        destination:  'public/uploads/teacher',
        filename: function ( req, file, cb ) {
            cb( null, file.originalname);
        }
    }
);
const upload = multer({ storage: storage });

exports.postTeacherAdmissionForm =  [upload.single('photo'),(req, res) => {
 
  d = req.body.dob;
  date = d.split("/").reverse().join("-");
 User.create({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        class:req.body.class,
        roll_no:req.body.roll_no,
        admission_id:req.body.admission_id,
        description:req.body.description,
        religion:req.body.religion,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender,
        dob:date,
        role:'3',
        blood_grp:req.body.blood_grp,
        image:req.file.filename
      }).then(result=>{
        req.flash('success-msg', "Teacher added successfully")  ;
        req.flash('success-class', "success")  ;
        return res.redirect('all-teachers'); 
      }).catch(err => {
        return res.redirect('teacher-admission-form');
   })
   }]

   exports.getEditTeacher = (req, res) => {
    Religion.findAll({attributes:['id', 'name'] ,raw:true}).then(function (religions) {
      Section.findAll({attributes:['id', 'name'] ,raw:true}).then(function (sections) {
        CommonController.getClassnameData().then(function (classnames) {
          User.findOne({where:{id:req.params.id}    
          }).then(result=>{
          data = {  title: 'Teacher',  
                    main_heading:'Teacher Edit Form',
                    list_heading:'All Teachers',
                    list_url: '/all-teachers',
                    sub_heading:'Update teacher data',
                    sections:sections,
                    religions:religions,
                    classnames:classnames,
                    data:result,
                    helper:require('../public/helper')
                  }
    
      return res.render('edit-teacher',  data);
    }).catch(err => {
       return res.json({ msg: "Something went wrong",  success:false });
   })
  })
})
})    
   }

   exports.postUpdateTeacher = [upload.single('photo'),(req, res) => {
    let image =""
    if(req.file != undefined)  {image = req.file.filename } 
    d = req.body.dob;
    date = d.split("/").reverse().join("-");
    User.update({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      class:req.body.class,
      roll_no:req.body.roll_no,
      admission_id:req.body.admission_id,
      description:req.body.description,
      religion:req.body.religion,
      email:req.body.email,
      phone:req.body.phone,
      gender:req.body.gender,
      dob:date,
      role:'3',
      blood_grp:req.body.blood_grp,
      image:image},
     { where:{id:req.body.id}}).then(result=>{
      req.flash('success-msg', "Teacher added successfully")  ;
      req.flash('success-class', "success")  ;
      return res.redirect('all-teachers'); 
        }).catch(err => {
   }); 
  }]
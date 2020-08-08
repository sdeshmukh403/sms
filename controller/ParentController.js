let User     = require('../model/user');
let Constant = require('../model/constant');
var express  = require('express');
const multer = require('multer');
let Religion   = require('../model/religion');
let CommonController = require('./CommonController');
let Section  = require('../model/section');
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

common_variables = [{role: localStorage.getItem('role'), 
profileimg : localStorage.getItem('profileImg' ),
username:localStorage.getItem('loginUser'),
Constant: require('../model/constant')
}]

exports.getParentList = (req, res) =>{
    User.findAll({where:{role:Constant.PARENT},
      attributes:['id', 'firstname','lastname', 'father_occupation', 'gender','address', 'phone', 'email'], 
      raw:true, helper:require('../public/helper')}).then(function (result) { 
        res.render('all-parents', {title: 'Parent', data: result });  
      });    
}

exports.getParentList = (req, res) =>{
  filterWhere ={role:Constant.PARENT};
  if(req.query.father_occupation||req.query.firstname||req.query.classname){
    if(req.query.father_occupation) filterWhere.father_occupation =req.query.father_occupation;
    if(req.query.firstname) filterWhere.firstname =req.query.firstname;
    if(req.query.classname) filterWhere.class =req.query.classname;  
  }
    User.findAll({where: filterWhere,
      attributes:['id', 'image', 'firstname','lastname', 'father_occupation', 'gender','address', 'dob', 'phone', 'email'] ,
      raw:true,
      order: [
        ['id', 'DESC']
    ]}).then(function (datas) { 
        res.render('all-parents', {title: 'Parent',  msg: req.flash('success-msg'),
        helper:require('../public/helper'),
        main_heading:'All Parents', sub_heading:'All Parent data', datas: datas });   
      });    
}

//view
exports.getParentDetail = (req, res) =>{ 
  User.findAll({where:{id:req.params.id},
     attributes: ['id', 'firstname', 'image', 'lastname','father_occupation', 'gender', 'address', 'phone', 'email'],
   raw:true}).then(function (result) { 
      res.render('parent-details', {title: 'Parent',
      msg: req.flash('success-msg'), 
      main_heading:'View parent detail',
      list_heading:'All Parents',
      list_url: '/all-parents',
      sub_heading:'View parent detail', 
      helper:require('../public/helper'),
      data: result[0] });  
   });
}

//edit

exports.getParentAdmissionForm = (req, res) => {
  Religion.findAll({attributes:['id', 'name'] ,raw:true}).then(function (religions) {
  Section.findAll({attributes:['id', 'name'] ,raw:true}).then(function (sections) {
    CommonController.getClassnameData().then(function (classnames) {
      data = {  title: 'Parent',  
                list_heading:'All Parents',
                list_url: '/all-parents',
                main_heading:'Parent Admit Form',
                sub_heading:'Add New Parent',
                sections:sections,
                religions:religions,
                classnames:classnames,
                helper:require('../public/helper'),
                common_variables
              }

    res.render('add-parent',  data );
  }).catch(err => {
    return res.json({ msg: "Something went wrong",  success:false });
});    
});
  });
  }

  var storage = multer.diskStorage(
    {
        destination:  'public/uploads/parent',
        filename: function ( req, file, cb ) {
            cb( null, file.originalname);
        }
    }
);
const upload = multer({ storage: storage });

exports.postParentAdmissionForm =  [upload.single('photo'),(req, res) => {
  let image =""
  if(req.file != undefined)  {image = req.file.filename } 

 User.create({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        address:req.body.address,
        religion:req.body.religion,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender,
        father_occupation:req.body.father_occupation,
        role:'4',
        image:image
      }).then(result=>{
        req.flash('success-msg', "Parent added successfully")  ;
        req.flash('success-class', "success")  ;
        return res.redirect('all-parents'); 
      }).catch(err => {
        console.log(err);
        return res.redirect('parent-admission-form');
   })
   }]

   exports.getEditParent = (req, res) => {
    Religion.findAll({attributes:['id', 'name'] ,raw:true}).then(function (religions) {
      Section.findAll({attributes:['id', 'name'] ,raw:true}).then(function (sections) {
        CommonController.getClassnameData().then(function (classnames) {
          User.findOne({where:{id:req.params.id}    
          }).then(result=>{
          data = {  title: 'Parent',  
                    main_heading:'Parent Edit Form',
                    list_heading:'All Parents',
                    list_url: '/all-parents',
                    sub_heading:'Update parent data',
                    sections:sections,
                    religions:religions,
                    classnames:classnames,
                    data:result,
                    helper:require('../public/helper')
                  }
    
      return res.render('edit-parent',  data);
    }).catch(err => {
       return res.json({ msg: "Something went wrong",  success:false });
   })
  })
})
})    
   }

   exports.postUpdateParent = [upload.single('photo'),(req, res) => {
    let image =""
    if(req.file != undefined)  {image = req.file.filename } 
    User.update({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      address:req.body.address,
      religion:req.body.religion,
      email:req.body.email,
      phone:req.body.phone,
      gender:req.body.gender,
      father_occupation:req.body.father_occupation,
      role:'4',
      blood_grp:req.body.blood_grp,
      image:image},
     { where:{id:req.body.id}}).then(result=>{
      req.flash('success-msg', "Parent added successfully")  ;
      req.flash('success-class', "success")  ;
      return res.redirect('all-parents'); 
        }).catch(err => {
   }); 
  }]

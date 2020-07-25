let User     = require('../model/user');
let Section  = require('../model/section');
let Constant = require('../model/constant');
let Religion   = require('../model/religion');
let CommonController = require('./CommonController');
const multer = require('multer');

exports.getStudentList = (req, res) =>{
  filterWhere ={role:Constant.STUDENT};
  if(req.query.roll_no||req.query.firstname||req.query.classname){
    if(req.query.roll_no) filterWhere.roll_no =req.query.roll_no;
    if(req.query.firstname) filterWhere.firstname =req.query.firstname;
    if(req.query.classname) filterWhere.class =req.query.classname;  
  }
  active_path = req.path.split('/')[1]

  User.findAll({where: filterWhere, 
    attributes:['id', 'image', 'firstname','lastname', 'roll_no', 'gender', 'section_id','address', 'dob', 'phone', 'email', 'class'] , 
  raw:true, order: [
    ['id', 'DESC']
]}).then(function (students) {
  common_variables = [{role: localStorage.getItem('role'), 
  profileimg : localStorage.getItem('profileImg' ),
  username:localStorage.getItem('loginUser'),
  Constant: require('../model/constant')
}]
data = { title: 'Student', active_path:active_path, helper:require('../public/helper'),
msg: req.flash('success-msg'),main_heading:'All Students', 
sub_heading:'All student data', data: students, common_variables }
  res.render('all-students', data);  
     });
}

exports.getStudentDetail = (req, res) =>{ 
    User.findAll({where:{id:req.params.id}, attributes: ['id', 'firstname', 'image', 'lastname','roll_no', 'gender', 'section_id','address', 'dob', 'phone', 'email', 'class'], raw:true}).then(function (result) { 
        res.render('student-details', {title: 'Student', main_heading:'View student detail',list_heading:'All Students',
        list_url: '/all-students', sub_heading:'View student detail', data: result[0] });  
     });
}

exports.getStudentAdmissionForm = (req, res) => {
  Religion.findAll({attributes:['id', 'name'] ,raw:true}).then(function (religions) {
  Section.findAll({attributes:['id', 'name'] ,raw:true}).then(function (sections) {
    CommonController.getClassnameData().then(function (classnames) {
      data = {  title: 'Student',  
                list_heading:'All Students',
                list_url: '/all-students',
                main_heading:'Student Admit Form',
                sub_heading:'Add New Student',
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
        destination:  'public/uploads/student',
        filename: function ( req, file, cb ) {
            cb( null, file.originalname);
        }
    }
);
const upload = multer({ storage: storage });

exports.postStudentAdmissionForm =  [upload.single('photo'),(req, res) => {
  let image =""
  if(req.file != undefined)  {image = req.file.filename } 
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
        image:image,
        password:'$2a$10$OVZMhKy7dQSi4EA6vc13HOf766DvNTDDDzk5cLeMEBAoW/MtuoKAG'
      }).then(result=>{
        req.flash('success-msg', "Student added successfully")  ;
        req.flash('success-class', "success")  ;
        return res.redirect('all-students'); 
      }).catch(err => {
        return res.redirect('student-admission-form');
   })
   }]

   exports.getEditStudent = (req, res) => {
    Religion.findAll({attributes:['id', 'name'] ,raw:true}).then(function (religions) {
      Section.findAll({attributes:['id', 'name'] ,raw:true}).then(function (sections) {
        CommonController.getClassnameData().then(function (classnames) {
          User.findOne({where:{id:req.params.id}    
          }).then(result=>{
          data = {  title: 'Student',  
                    main_heading:'Student Admit Form',
                    list_heading:'All Students',
                    list_url: '/all-students',
                    sub_heading:'Update student data',
                    sections:sections,
                    religions:religions,
                    classnames:classnames,
                    student:result,
                    helper:require('../public/helper')
                  }
    
      return res.render('edit-student',  data);
    }).catch(err => {
       return res.json({ msg: "Something went wrong",  success:false });
   })
  })
})
})    
   }

   exports.postUpdateStudent = [upload.single('photo'),(req, res) => {
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
      req.flash('success-msg', "Student added successfully")  ;
      req.flash('success-class', "success")  ;
      return res.redirect('all-students'); 
        }).catch(err => {
   }); 
  }]

  exports.deleteUser = (req, res) => {   
    User.destroy({
      where:{id:req.params.id}
    }).then(result=>{
      return res.redirect('/all-students'); 
    }).catch(err => {
   }); 
  }

  exports.deleteUsers = (req, res) => {
    let r = Object.values(req.body)
    arr1d = [].concat(...r);
    User.destroy({
      where:{id:arr1d}
    }).then(result=>{
      return res.json({msg:'Students deleted successfully.'}); 
    }).catch(err => {
      return res.json({msg:'Students deleted successfully.'});
   }); 
  }


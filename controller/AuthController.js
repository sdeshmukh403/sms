let User = require('../model/user');
let bcrypt = require('bcryptjs'); 
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
let Constant = require('../model/constant');

let transport = nodemailer.createTransport({  host: "smtp.mailtrap.io",
port: 2525,
auth: {
  user: "32980c66fec375",
  pass: "f67d40f18a6a79"
}})


if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

common_variables = [{role: localStorage.getItem('role'), 
profileimg : localStorage.getItem('profileImg' ),
username:localStorage.getItem('loginUser'),
Constant: require('../model/constant')
}]

exports.checkLogined = (req, res, next) =>
{
    if (req.url === '/signup' || req.url === '/login' || req.url === '/forget-password'|| req.url === '/reset-password')  
    {
      if(localStorage.getItem('userToken') ){
        res.redirect('/')
        }
      return next();
    }
  if(localStorage.getItem('userToken') ) {
    next();
    }else{
      res.redirect('/login');
  }
 
 }

exports.getLogout = (req, res) =>{
  localStorage.removeItem('userToken');
  res.redirect('/login');

}

exports.getDashboard = (req, res) =>{
  res.render('home');
}

exports.getLogin = (req, res) => {
  res.render('login', {title:'Login', err_msg: req.flash('err-msg')})
}

exports.postLogin = (req, res) => {
  
  User.findOne({  attributes:['password', 'id', 'username', 'role', 'image'], raw:true ,
   where:[{email:req.body.email}]}).then( result => {
   if(result && bcrypt.compareSync(req.body.password, result.password )){
    var token = jwt.sign({userId:result.id}, 'loginToken');
    localStorage.setItem('userToken', token)
    localStorage.setItem('loginUser', result.username)
    localStorage.setItem('UserId', result.id)

    let profileimg = ''
    let role = '';
    switch(result.role){
      case 1:
        role = 1,
        profileimg = 'uploads/admin/'+result.image,
        url = '/admin-dashboard';
      break  
      
      case 2:
        role = 2,
        profileimg = 'uploads/teacher/'+result.image,
        url = '/teacher-dashboard';
      break 

      case 3:
        role = 3,
        profileimg = 'uploads/student/'+result.image,
        url = '/student-dashboard';
      break 
      
      case 4:
        role= 4,
        profileimg = 'uploads/parent/'+result.image,
        url = '/parent-dashboard';
      break 
    }
    localStorage.setItem('profileImg', profileimg)
    localStorage.setItem('role', role)
    res.redirect(url);
   } 
   req.flash('err-msg', "Credentials are invalid");
   res.redirect('/login');
  });
}

exports.getSignup = (req, res) => {
res.render('signup', {title:'Signup', errs:''});
}

exports.checkEmail = (req, res, next) => {
  User.findOne({email:req.body.email}).then(result=>{
    return res.send(typeof result);

   // return res.render('signup', {title:'Password Management system', msg:'Email already exist' });
  }).catch(err => {
    return res.render('signup', {title:'Password Management system', msg:''});
     });

}

exports.checkUsername = (req, res, next) => {
  User.findAll({where:{username:req.body.username}}).then(result=>{
    return res.send(result);
   if(result == []){ 
    return res.render('signup', {title:'Password Management system', msg:'Username1 already exist' });

   } else { res.status(404) }

      }).catch(err => {
    return res.render('signup', {title:'Password Management system', msg:''});
     });

}

exports.checkReqValidation = (req, res, next) => {
errs = [];
if(req.body.username == ""){
  errs.push({message:"Username is required"}) ;
  }
if(req.body.email == ""){
  errs.push({message:"Email is required"}) ;
  }

if(req.body.password == ""){
  errs.push({message:"Password is required"}) ;
  }
if(req.body.confirm_password == ""){
  errs.push({message:"Confirm Password is required"}) ;
}
if(req.body.password !=  req.body.confirm_password){
  errs.push({message:"Password must be matched"}) ;
}
if(errs != ""){
return res.render('signup', {title:'Password Management system', errs:errs });
}
next();
}

exports.postSignup = (req, res, next) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var confirm_password = req.body.confirm_password;
  let msg = '';
 User.create({
  username:username,
  email:email,
  type:true,
  password:bcrypt.hashSync(password, 10)
 }).then(result =>{
  res.render('login', {title: 'Password Category', categories: result });  

 }).catch(err => {
  return res.render('signup', {title:'Password Management system', errs:err.errors });
 // return res.send(err.errors);
 }); 
}


exports.getForgetPassword = (req, res) => {
  res.render('forget_password', {title:'Send Link', errs:''});
  }

  exports.postForgetPassword = (req, res) => {  
  const message = {
    from: 'elonmusk@tesla.com', // Sender address
    to: req.body.email,         // List of recipients
    subject: 'Reset your password', // Subject line
    html: "<a href='http://localhost:3000/reset-password'>link </a>" // Plain text body
};
transport.sendMail(message, function(err, info) {
 
});
localStorage.setItem('email_for_reset', req.body.email)
res.send("Link has been sent to your email please check")
}

exports.getResetPassword = (req, res) => {
  res.render('reset_password', {title:'Reset Password', errs:''});
  }

exports.postResetPassword = (req, res) => {
let email = localStorage.getItem('email_for_reset')
  User.update({
    password:bcrypt.hashSync(req.body.cnfm_password, 10)},
     { where:{email:email}}).then(result=>{
    return res.redirect('/login'); 
      })
      localStorage.removeItem('email_for_reset');   
  }

  exports.getAccountSettings = (req, res) => {

  data = {title:'Account Settings',helper:require('../public/helper'), main_heading:'Account Settings', 
  common_variables
 }
    res.render('account-settings', data);

  }

  exports.getProfile = (req, res) => {   
   User.findOne({where:{id:localStorage.getItem('UserId')},
    attributes: ['id', 'firstname', 'image', 'lastname',
    'roll_no', 'gender', 'section_id','address', 'dob', 'phone', 'email', 'class','role','religion'],
    raw:true}).then(function (result) {
      console.log(result);
      data = {title:'Profile',helper:require('../public/helper'), main_heading:'Profile', 
      common_variables, data:result
     }
      res.render('profile', data);                              
   })
 }

 exports.checkRole = (req, res) =>{
  var url= '';
  switch(Number(localStorage.getItem('role'))){
    case Constant.ADMIN:
    var  url = '/admin-dashboard'
    break  

    case Constant.TEACHER:
      url = '/teacher-dashboard'
    break 

    case Constant.STUDENT:
      url = '/student-dashboard'
    break 

    case Constant.PARENT:
      url = '/parent-dashboard'
    break 
  }
  res.redirect(url);

}
let User = require('../model/user');
let bcrypt = require('bcryptjs'); 
var jwt = require('jsonwebtoken');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
exports.checkLogined = (req, res, next) =>
{
    if (req.url === '/signup' || req.url === '/login') 
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
  res.render('login', {title:'Login'})
}

exports.postLogin = (req, res) => {
  User.findOne({  attributes:['password', 'id', 'username', 'role', 'image'], raw:true , where:[{email:req.body.email}]}).then( result => {
  if(bcrypt.compareSync(req.body.password, result.password )){
    var token = jwt.sign({userId:result.id}, 'loginToken');
    localStorage.setItem('userToken', token)
    localStorage.setItem('loginUser', result.username)
    let profileimg = ''
    let role = '';
    switch(result.role){
      case 1:
        role = 1,
        profileimg = 'uploads/admin/'+result.image
      break  
      case 2:
        role = 2,
        profileimg = 'uploads/teacher/'+result.image
      break 
      case 3:
        role = 3,
        profileimg = 'uploads/student/'+result.image
      break 
      case 4:
        role= 4,
        profileimg = 'uploads/parent/'+result.image
      break 
    }
    localStorage.setItem('profileImg', profileimg)
    localStorage.setItem('role', role)
    res.redirect('/admin-dashboard');

   } 
  res.send("Credentials are invalid");
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

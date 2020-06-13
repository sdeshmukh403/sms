let Category = require('../model/category');
let User = require('../model/user');
const { check, validationResult } = require('express-validator');


//Password Category
exports.getPasswordCategoryList = (req, res) => {
  
  Category.findAll({attributes:['id','name'], raw:true}).then(function (result) {      
    res.render('password_category', {title: 'Password Category', categories: result });  
  });
}

exports.postAddPasswordCategory =[ check('category_name', 'Please enter category name').isLength({min:1}), (req, res) => {
  const errors = validationResult(req);
 if (!errors.isEmpty()) {
    return res.json({ msg: errors.errors[0].msg, success:false });
  }
  
  Category.create({
    name:req.body.category_name
  }).then(result=>{
     return res.json({ msg: "Category added successfully", success:true}); 
  }).catch(err => {
     return res.json({ msg: "Something went wrong",  success:false });
 });
 
}]

exports.postUpdatePasswordCategory =[ check('category_name', 'Please enter category name').isLength({min:1}), (req, res) => {
  const errors = validationResult(req);
 if (!errors.isEmpty()) {
    return res.json({ msg: errors.errors[0].msg, success:false });
  }
  Category.update({name:req.body.category_name},
   { where:{id:req.body.id}}).then(result=>{
     return res.json({ msg: "Category updated successfully", success:true}); 
  }).catch(err => {
     return res.json({ msg: "Something went wrong",  success:false });
 }); 
}]

exports.getEditPasswordCategory = (req, res) => {

  Category.findAll({where:{id:req.query.id}    
  }).then(result=>{
     return res.json({ msg: "", success:true, data:result}); 
  }).catch(err => {
     return res.json({ msg: "Something went wrong",  success:false });
 });  
}

exports.postDeletePasswordCategory = (req, res) => {   
  Category.destroy({
    where:{id:req.body.id}
  }).then(result=>{
     return res.json({ msg: "Category deleted successfully", success:true}); 
  }).catch(err => {
     return res.json({ msg: "Something went wrong",  success:false });
 }); 
}


//Password Detail
exports.getPasswordDetail = (req, res) =>{
  User.findAll({where:{type: 1}}).then(function (result) {
     res.render('password_detail', {title: 'Password Detail', password_details: result });  
  });
} 

exports.postAddPasswordDetail = [ 
check('username', 'Please enter username').isLength({min:1}),
check('url', 'Please enter url').not().isEmpty(),
check('password', 'Please enter password').isLength({min:1}), (req, res) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ msg: errors.errors, success:false });
  }
  User.create({
    username:req.body.username,
    url:req.body.url,
    password:req.body.password
  }).then(result=>{
     return res.json({ msg: "Password detail added successfully", success:true}); 
  }).catch(err => {
    return res.send(err);
     return res.json({ msg: err,  success:false });
 }); 
}] 

exports.getEditPasswordDetail = (req, res) => {
  User.findAll({where:{id:req.query.id}    
  }).then(result=>{
     return res.json({ msg: "", success:true, data:result}); 
  }).catch(err => {
     return res.json({ msg: "Something went wrong",  success:false });
 });  
}

exports.postUpdatePasswordDetail = [ 
  check('username', 'Please enter username').isLength({min:1}),
  check('url', 'Please enter url').not().isEmpty(),
  check('password', 'Please enter password').isLength({min:1}), (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ msg: errors.errors, success:false });
    }
    console.log(req.body.id)
 User.update({
    username:req.body.username,
    url:req.body.url,
    password:req.body.password},
   { where:{id:req.body.id}}).then(result=>{
     return res.json({ msg: "Password detail updated successfully", success:true}); 
  }).catch(err => {
     return res.json({ msg: "Something went wrong",  success:false });
 }); 
}]


exports.postDeletePasswordDetail = (req, res) => {   
  User.destroy({
    where:{id:req.body.id}
  }).then(result=>{
     return res.json({ msg: "Password detail deleted successfully", success:true}); 
  }).catch(err => {
     return res.json({ msg: "Something went wrong",  success:false });
 }); 
}

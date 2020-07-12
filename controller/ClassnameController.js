let Classname   = require('../model/classname');
let CommonController = require('./CommonController');

exports.getClassnameList = (req, res) =>{
  CommonController.getClassnameData().then(function (result) { 
       res.render('all-classes', {title: 'Class', main_heading:'All Classes', sub_heading:'Add new class', data: result });  
    });  
}

exports.postAddClassname = (req, res) => {
    Classname.create({
        name:req.body.name
      }).then(result=>{
        return res.redirect('all-classes'); 
      }).catch(err => {
        return res.redirect('all-classes');
   })}
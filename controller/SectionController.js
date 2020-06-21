let Section   = require('../model/section');
var express  = require('express');
const router = express.Router();

exports.getSectionList = (req, res) =>{
    Section.findAll({attributes:['id', 'name'] ,raw:true}).then(function (result) { 
         res.render('all-sections', {title: 'Section', main_heading:'All Sections', sub_heading:'Add new section', data: result });  
      });    
}


exports.postAddSection = (req, res) => {
    Section.create({
        name:req.body.name
      }).then(result=>{
        return res.redirect('all-sections'); 
      }).catch(err => {
        return res.redirect('all-sections');
   })}
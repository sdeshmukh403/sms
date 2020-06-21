let Religion   = require('../model/religion');
var express  = require('express');
const router = express.Router();

exports.getReligionList = (req, res) =>{
    Religion.findAll({attributes:['id', 'name'] ,raw:true}).then(function (result) { 
         res.render('all-religions', {title: 'Religion', main_heading:'All Religions', sub_heading:'Add new religions', data: result });  
      });    
}


exports.postAddReligion = (req, res) => {
    Religion.create({
        name:req.body.name
      }).then(result=>{
        return res.redirect('all-religions'); 
      }).catch(err => {
        return res.redirect('all-religions');
   })}
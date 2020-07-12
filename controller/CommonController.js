let Classname   = require('../model/classname');
var express = require('express');
exports.getClassnameData = () => {
    return Classname.findAll({attributes:['id', 'name'] ,raw:true});  
}

function go(){
    return "sdfds";
}
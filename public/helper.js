let Constant = require('../model/constant');
let User  = require('../model/user');
var dateFormat = require('dateformat');
var commonController = require('../controller/CommonController');

var func = {
    gender_name: function(gender_id) {        
        switch(gender_id){
            case Constant.MALE:
                gender_name="Male";
                break;
            case Constant.FEMALE:
                gender_name="Female";
                break;   
            case Constant.OTHER:
                gender_name="Others";
                break;      
            default:
                gender_name="-";
        }
        return gender_name;
    }, 
    convertDate: (date) => {
        if(date){
       return date.split("-").reverse().join("/");
    }},
    convertNoticeDate: (date) => {
    return dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    },
    convertBookDate: (date) => {
        return dateFormat(date, " mmmm dS, yyyy");
     },
    convertProfileDate: (date) => {
    return dateFormat(date, " dd.mm.yyyy");
    },   
    getRoleName : function(role_id){
        switch(role_id){
            case Constant.ADMIN:
                role_name="Admin";
                break;
            case Constant.TEACHER:
                role_name="Teacher";
                break;   
            case Constant.STUDENT:
                role_name="Student";
                break; 
            case Constant.PARENT:
                role_name="Parent";
                break;          
            default:
                role_name="-";
        }
        return role_name;

    }
}
module.exports = func;
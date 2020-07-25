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
     }  
}
module.exports = func;
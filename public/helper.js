let Constant = require('../model/constant');
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
    foo: function(date) {
        //do somethings
    }    
};
module.exports = func;
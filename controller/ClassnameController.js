let Classname   = require('../model/classname');
let CommonController = require('./CommonController');

exports.getClassnameList = (req, res) =>{
  active_path = req.path.split('/')[1]

  CommonController.getClassnameData().then(function (result) { 
    data =  {
      title: 'Class',
      main_heading:'All Classes',
      sub_heading:'Add new class',
      datas: result,
      active_path:active_path,
      helper:require('../public/helper'),
      msg: req.flash('success-msg') 
      }
       res.render('all-classes', data);  
    });  
}

exports.postAddClassname = (req, res) => {
    Classname.create({
        name:req.body.name
      }).then(result=>{
        req.flash('success-msg', "Class deleted successfully")  ;
      req.flash('success-class', "success");
        return res.redirect('all-classes'); 
      }).catch(err => {
        return res.redirect('all-classes');
   })}

   exports.deleteClassname = (req, res) => {   
    Classname.destroy({
      where:{id:req.params.id}
    }).then(result=>{
      req.flash('success-msg', "Class deleted successfully")  ;
      req.flash('success-class', "success");
      return res.redirect('/all-sections'); 
    }).catch(err => {
      console.log(err);
   }); 
  }

  exports.deleteClassnames = (req, res) => {
    let r = Object.values(req.body)
    arr1d = [].concat(...r);
    Classname.destroy({
      where:{id:arr1d}
    }).then(result=>{
      return res.json({msg:'Class deleted successfully.'}); 
    }).catch(err => {
      return res.json({msg:'Class deleted successfully.'});
   }); 
  }


let Subject = require('../model/subject');


exports.getSubjectList = (req, res) =>{
    Subject.findAll({attributes:['id', 'name', 'board', 'class'] ,raw:true}).then(function (result) { 
      active_path = req.path.split('/')[1]
      data = {
        title: 'Subject',
        data: result,
        main_heading:'All Subjects',
         sub_heading:'Add new Subject',
         datas: result,
         active_path:active_path,
         helper:require('../public/helper'),
         msg: req.flash('success-msg') 
      }
         res.render('all-subject', data);  
      });    
} 

 exports.postAddSubject = (req, res) =>{   
    Subject.create({
      name:req.body.name,
      class:req.body.class,
      board:req.body.board
    }).then(result=>{
      return res.json({ msg: 'Subject added successfully', success:true}); 
    }).catch(err => {
      return res.json({ msg: 'Something went wrong',  success:false });
 })
}

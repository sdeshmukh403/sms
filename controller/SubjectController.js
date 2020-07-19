let Subject = require('../model/subject');

exports.getSubjectList = (req, res) =>{
    Subject.findAll({attributes:['id', 'name', 'board', 'class'] ,raw:true}).then(function (result) { 
         res.render('all-subject', {title: 'Subject', data: result });  
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

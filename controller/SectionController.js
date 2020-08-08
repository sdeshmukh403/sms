let Section   = require('../model/section');
common_variables = [{role: localStorage.getItem('role'), 
profileimg : localStorage.getItem('profileImg' ),
username:localStorage.getItem('loginUser'),
Constant: require('../model/constant')
}]

exports.getSectionList = (req, res) =>{
  filterWhere ={};
  if(req.query.name) filterWhere.name = req.query.name;   
  active_path = req.path.split('/')[1]
  
  Section.findAll({where: filterWhere, 
    attributes:['id', 'name'], 
    raw:true,
    order: [
    ['id', 'DESC']
]}).then(function (result) { 

         data =  {
         title: 'Section',
         main_heading:'All Sections',
         sub_heading:'Add new section',
         datas: result,
         active_path:active_path,
         helper:require('../public/helper'),
         msg: req.flash('success-msg')           
     }
     res.render('all-sections', data);
    });            
}


exports.postAddSection = (req, res) => {
    Section.create({
        name:req.body.name
      }).then(result=>{
        req.flash('success-msg', "Section added successfully")  ;
        req.flash('success-class', "success");
        return res.redirect('all-sections'); 
      }).catch(err => {
        return res.send(err);
   })
  }

  exports.deleteSection = (req, res) => {   
    Section.destroy({
      where:{id:req.params.id}
    }).then(result=>{
      req.flash('success-msg', "Section deleted successfully")  ;
      req.flash('success-class', "success");
      return res.redirect('/all-sections'); 
    }).catch(err => {
   }); 
  }

  exports.deleteSections = (req, res) => {
    let r = Object.values(req.body)
    arr1d = [].concat(...r);
    Section.destroy({
      where:{id:arr1d}
    }).then(result=>{
      return res.json({msg:'Sections deleted successfully.'}); 
    }).catch(err => {
      return res.json({msg:'Sections deleted successfully.'});
   }); 
  }


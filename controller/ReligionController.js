let Religion   = require('../model/religion');
common_variables = [{role: localStorage.getItem('role'), 
profileimg : localStorage.getItem('profileImg' ),
username:localStorage.getItem('loginUser'),
Constant: require('../model/constant')
}]

exports.getReligionList = (req, res) =>{
  filterWhere ={};
  if(req.query.name) filterWhere.name = req.query.name;   
  active_path = req.path.split('/')[1]
    Religion.findAll({where: filterWhere, 
      attributes:['id', 'name'], 
      raw:true,
      order: [
      ['id', 'DESC']
  ]}).then(function (result) { 
    data = {
     title: 'Religion', 
     main_heading:'All Religions', 
     sub_heading:'Add new religions',
     datas: result,
     active_path:active_path,
     helper:require('../public/helper'),
     msg: req.flash('success-msg')
       }
         res.render('all-religions', data);  
      });    
}


exports.postAddReligion = (req, res) => {
    Religion.create({
        name:req.body.name
      }).then(result=>{
        req.flash('success-msg', "Religion added successfully")  ;
        req.flash('success-class', "success");
        return res.redirect('all-religions'); 
      }).catch(err => {
        return res.redirect('all-religions');
   })}

   exports.deleteReligion = (req, res) => {   
    Religion.destroy({
      where:{id:req.params.id}
    }).then(result=>{
      req.flash('success-msg', "Religion deleted successfully")  ;
      req.flash('success-class', "success");
      return res.redirect('/all-religions'); 
    }).catch(err => {
      console.log(err);
   }); 
  }

  exports.deleteReligions = (req, res) => {
    let r = Object.values(req.body)
    arr1d = [].concat(...r);
    Religion.destroy({
      where:{id:arr1d}
    }).then(result=>{
      return res.json({msg:'Religions deleted successfully.'}); 
    }).catch(err => {
      return res.json({msg:'Religions deleted successfully.'});
   }); 
  }

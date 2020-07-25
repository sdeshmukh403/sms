let Transport  = require('../model/transport');
let CommonController = require('./CommonController');

exports.getTransportList = (req, res) =>{
  filterWhere ={};
  if(req.query.route_name||req.query.vehicle_no||req.query.phone_no){
    if(req.query.route_name) filterWhere.route_name = req.query.route_name;
    if(req.query.vehicle_no) filterWhere.vehicle_no = req.query.vehicle_no;
    if(req.query.phone_no) filterWhere.phone_no =req.query.phone_no;  
  }
  active_path = req.path.split('/')[1]
  
  Transport.findAll({where: filterWhere, 
    attributes:['id', 'vehicle_no', 'phone_no','route_name', 'driver_name','liences_no'] , 
  raw:true, order: [
    ['id', 'DESC']
]}).then(function (transports) {
  res.render('transport', {title: 'Transport',
  active_path:active_path, helper:require('../public/helper'),
  msg: req.flash('success-msg'),
   main_heading:'All Transports', datas: transports });  
     });
}

exports.postAddTransport = (req, res) => {
 Transport.create({
        vehicle_no:req.body.vehicle_no,
        phone_no:req.body.phone_no,
        driver_name:req.body.driver_name,
        route_name:req.body.route_name,  
        liences_no:req.body.liences_no     
      }).then(result=>{
        req.flash('success-msg', "Transport added successfully")  ;
        req.flash('success-class', "success");
        return res.redirect('/transport'); 
      }).catch(err => {
   })
   }

   exports.deleteTransport = (req, res) => {   
    Transport.destroy({
      where:{id:req.params.id}
    }).then(result=>{
      req.flash('success-msg', "Transport deleted successfully")  ;
      req.flash('success-class', "success");
      return res.redirect('/transport'); 
    }).catch(err => {
   }); 
  }

  exports.deleteTransports = (req, res) => {
    let r = Object.values(req.body)
    arr1d = [].concat(...r);
    Transport.destroy({
      where:{id:arr1d}
    }).then(result=>{
      return res.json({msg:'Transports deleted successfully.'}); 
    }).catch(err => {
      return res.json({msg:'Transports deleted successfully.'});
   }); 
  }

  exports.editTransport = (req, res) => {
    active_path = req.path.split('/')[1]
    Transport.findOne({where:{id:req.params.id}    
          }).then(transport=>{
          data = {  title: 'Transport',
          active_path:active_path, main_heading:'All Transports', data: transport                    
                  }    
      return res.render('transport',  data);
    }).catch(err => {
      console.log(err);
       return res.json({ msg: "Something went wrong",  success:false });
   })
   
   }
   
   exports.updatetTransport =(req, res) => {
    Transport.update({
      vehicle_no:req.body.vehicle_no,
        phone_no:req.body.phone_no,
        driver_name:req.body.driver_name,
        route_name:req.body.route_name,  
        liences_no:req.body.liences_no  },
     { where:{id:req.body.id}}).then(result=>{
      req.flash('success-msg', "Student added successfully")  ;
      req.flash('success-class', "success")  ;
      return res.redirect('transport'); 
        }).catch(err => {
   }); 
  }

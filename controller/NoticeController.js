let Notice = require('../model/notice');

exports.getNoticeList = (req, res) =>{
    var filterWhere ={};
    console.log(req.query.title);
    if(req.query.title||req.query.date){
        if(req.query.title) filterWhere.title = req.query.title;
        if(req.query.date) filterWhere.date = req.query.date;  
      }
      active_path = req.path.split('/')[1]
    Notice.findAll({where: filterWhere,
        attributes:['title', 'description', 'created_by', 'createdAt'], order: [
        ['id', 'DESC']
    ] , raw:true}).then(function (result) { 
        var class_color = ["bg-skyblue","bg-yellow","bg-pink"];
         res.render('notice-board', {title: 'Notice', active_path:active_path, main_heading:'All Notices', class_color:class_color, helper:require('../public/helper'),  datas: result });  
      });    
} 

 exports.postAddNotice = (req, res) =>{   
    Notice.create({
      title:req.body.title,
      description:req.body.description,
      created_by:req.body.created_by
    }).then(result=>{
        return res.json({ msg: 'Notice created successfully', success:true}); 
    }).catch(err => {
        console.log(err);
        return res.json({ msg: err, success:true}); 
 })
}

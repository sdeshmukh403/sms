let Library  = require('../model/library');
let Constant = require('../model/constant');
let Section  = require('../model/section');
let CommonController = require('./CommonController');
let Subject = require('../model/subject');


exports.getBookList = (req, res) =>{
  filterWhere ={};
  if(req.query.subject||req.query.book_name||req.query.writer){
    if(req.query.subject) filterWhere.subject = req.query.subject;
    if(req.query.book_name) filterWhere.book_name = req.query.book_name;
    if(req.query.writer) filterWhere.writer =req.query.writer;  
  }
  active_path = req.path.split('/')[1]
  filter_data = ["Subject", "Bookname", "Writer"]
  filter_name = ["subject", "book_name", "writer"]

  Library.findAll({where: filterWhere, 
    attributes:['id', 'book_name', 'writer','subject', 'class', 'published','creating_date'] , 
  raw:true, order: [
    ['id', 'DESC']
]}).then(function (books) {
  res.render('all-books', {title: 'Book', filter_name:filter_name,filter_data:filter_data,
  active_path:active_path, helper:require('../public/helper'),
  msg: req.flash('success-msg'),
   main_heading:'All Books', sub_heading:'All book data', datas: books });  
     });
}

exports.getBookAdmissionForm = (req, res) => {
  Section.findAll({attributes:['id', 'name'] ,raw:true}).then(function (sections) {
    CommonController.getClassnameData().then(function (classnames) {
        Subject.findAll({attributes:['id', 'name', 'board', 'class'] ,raw:true}).then(function (subjects) { 
      data = {  title: 'Book',  
                list_heading:'All Books',
                list_url: '/all-books',
                main_heading:'Book Admit Form',
                sub_heading:'Add New Book',
                sections:sections,
                classnames:classnames,
                subjects:subjects
              }

    res.render('add-book',  data );
  });  
}); 
});
  }


exports.postBookAdmissionForm = (req, res) => {
    d = req.body.creating_date;
    date = d.split("/").reverse().join("-");
 Library.create({
        book_name:req.body.book_name,
        writer:req.body.writer,
        class:req.body.class,
        section:req.body.section,
        published:req.body.published,
        creating_date:date,
        subject:req.body.subject       
      }).then(result=>{
        req.flash('success-msg', "Book added successfully")  ;
        req.flash('success-class', "success")  ;
        return res.redirect('all-books'); 
      }).catch(err => {
        return res.redirect('book-admission-form');
   })
   }

   exports.getEditBook = (req, res) => { 
        CommonController.getClassnameData().then(function (classnames) {
            Subject.findAll({attributes:['id', 'name', 'board', 'class'] ,raw:true}).then(function (subjects) { 
          Library.findOne({where:{id:req.params.id}    
          }).then(result=>{
          data = {  title: 'Book',  
                    main_heading:'Book Admit Form',
                    list_heading:'All Books',
                    list_url: '/all-books',
                    sub_heading:'Update book data',
                    subjects:subjects,                   
                    classnames:classnames,
                    data:result,
                    helper:require('../public/helper')
                  }    
      return res.render('edit-book',  data);
    }).catch(err => {
       return res.json({ msg: "Something went wrong",  success:false });
   })
})
})    
   }

   exports.postUpdateBook = (req, res) => {
    Library.update({
        book_name:req.body.book_name,
        writer:req.body.writer,
        class:req.body.class,
        section:req.body.section,
        published:req.body.published,
         subject:req.body.subject  },
     { where:{id:req.body.id}}).then(result=>{
      req.flash('success-msg', "Book updated successfully")  ;
      req.flash('success-class', "success")  ;
      return res.redirect('all-books'); 
        }).catch(err => {
   }); 
  }

  exports.deleteBook = (req, res) => {   
    Library.destroy({
      where:{id:req.params.id}
    }).then(result=>{
      return res.redirect('/all-books'); 
    }).catch(err => {
   }); 
  }

  exports.deleteBooks = (req, res) => {
    let r = Object.values(req.body)
    arr1d = [].concat(...r);
    Library.destroy({
      where:{id:arr1d}
    }).then(result=>{
      return res.json({msg:'Books deleted successfully.'}); 
    }).catch(err => {
      return res.json({msg:'Books deleted successfully.'});
   }); 
  }


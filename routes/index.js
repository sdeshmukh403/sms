const express = require('express')
var router = express.Router();
let homeController = require('../controller/HomeController');
let subjectController = require('../controller/SubjectController');
let studentController = require('../controller/StudentController');
let teacherController = require('../controller/TeacherController');
let parentController = require('../controller/ParentController');
let sectionController = require('../controller/SectionController');
let religionController = require('../controller/ReligionController');
let classnameController = require('../controller/ClassnameController');
let dashboardController = require('../controller/DashboardController');
let noticeController = require('../controller/NoticeController');
let libraryController = require('../controller/LibraryController');



const fs = require('fs')

const path = require('path')
/* GET home page. */
router.get('/', homeController.getDashboard);
router.get('/test', function(req, res){
res.render('test');
});
router.get('/all-subjects', subjectController.getSubjectList);
router.post('/add-subject', subjectController.postAddSubject);

//Admin dashboard
router.get('/admin-dashboard', dashboardController.getAdminDashboard);

// student page
router.get('/all-students/:roll_no?/:firstname?/:classname?', studentController.getStudentList);
router.get('/view-student/:id', studentController.getStudentDetail);
router.get('/student-admission-form', studentController.getStudentAdmissionForm);
router.post('/student-admission-form', studentController.postStudentAdmissionForm);
router.get('/edit-student/:id', studentController.getEditStudent);
router.post('/update-student', studentController.postUpdateStudent);
router.get('/delete-user/:id', studentController.deleteUser);
router.post('/students-bulk-delete', studentController.deleteUsers);

//teacher page
router.get('/all-teachers/:roll_no?/:firstname?/:classname?', teacherController.getTeacherList);
router.get('/view-teacher/:id', teacherController.getTeacherDetail);
router.get('/teacher-admission-form', teacherController.getTeacherAdmissionForm);
router.post('/teacher-admission-form', teacherController.postTeacherAdmissionForm);
router.get('/edit-teacher/:id', teacherController.getEditTeacher);
router.post('/update-teacher', teacherController.postUpdateTeacher);

//parent page
router.get('/all-parents/:roll_no?/:firstname?/:classname?', parentController.getParentList);
router.get('/view-parent/:id', parentController.getParentDetail);
router.get('/parent-admission-form', parentController.getParentAdmissionForm);
router.post('/parent-admission-form', parentController.postParentAdmissionForm);
router.get('/edit-parent/:id', parentController.getEditParent);
router.post('/update-parent', parentController.postUpdateParent);

//library page
router.get('/all-books/:subject?/:book_name?/:writer?', libraryController.getBookList);
router.get('/book-admission-form', libraryController.getBookAdmissionForm);
router.post('/book-admission-form', libraryController.postBookAdmissionForm);
router.get('/edit-book/:id', libraryController.getEditBook);
router.post('/update-book', libraryController.postUpdateBook); 
router.get('/delete-book/:id', libraryController.deleteBook);
router.post('/books-bulk-delete', libraryController.deleteBooks);
//notice page
router.get('/all-notices', noticeController.getNoticeList);
router.post('/add-notice', noticeController.postAddNotice);

//section page
router.get('/all-sections', sectionController.getSectionList);
router.post('/add-section', sectionController.postAddSection);

//religion page
router.get('/all-religions', religionController.getReligionList);
router.post('/add-religion', religionController.postAddReligion);

//class name page
router.get('/all-classes', classnameController.getClassnameList);
router.post('/add-classname', classnameController.postAddClassname);


router.get('/video', function(req, res) {
	const path = '../public/assets/videos/sample.mp4';
	const stat = fs.statSync(path)
	const fileSize = stat.size
	const range = req.headers.range
	if (range) {
		const parts = range.replace(/bytes=/, "").split("-")
		const start = parseInt(parts[0], 10)
		const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1
		const chunksize = (end-start)+1
		const file = fs.createReadStream(path, {start, end})
		const head = {
			'Content-Range': `bytes ${start}-${end}/${fileSize}`,
			'Accept-Ranges': 'bytes',
			'Content-Length': chunksize,
			'Content-Type': 'video/mp4',
		}
		res.writeHead(206, head)
		file.pipe(res)
	} else {
		const head = {
			'Content-Length': fileSize,
			'Content-Type': 'video/mp4',
		}
		res.writeHead(200, head)
		fs.createReadStream(path).pipe(res)
	}
})
module.exports = router;

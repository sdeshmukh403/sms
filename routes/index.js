const express = require('express')
var router = express.Router();
let homeController = require('../controller/HomeController');
let subjectController = require('../controller/SubjectController');
let studentController = require('../controller/StudentController');
let teacherController = require('../controller/TeacherController');
let parentController = require('../controller/ParentController');


const fs = require('fs')

const path = require('path')
/* GET home page. */
router.get('/', homeController.getDashboard);
router.get('/test', function(req, res){
res.render('test');
});
router.get('/all-subjects', subjectController.getSubjectList);
router.post('/add-subject', subjectController.postAddSubject);

// student page
router.get('/all-students', studentController.getStudentList);
router.get('/view-student/:id', studentController.getStudentDetail);
router.get('/student-admission-form', studentController.getStudentAdmissionForm);
router.post('/student-admission-form', studentController.postStudentAdmissionForm);

//teacher page
router.get('/all-teachers', teacherController.getTeacherList);

//parent page
router.get('/all-parents', parentController.getParentList);


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

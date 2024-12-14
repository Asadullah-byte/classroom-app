const express = require('express');

const {handlePostCourse , handleGetAllCourse} = require('../controllers/course.controller')

const router = express.Router();

router.post('/course/add-course', handlePostCourse);

router.get('/course', handleGetAllCourse);  

module.exports = router;

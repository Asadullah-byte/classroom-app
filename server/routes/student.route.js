const express = require('express');
const {handlePostStudent} = require('../controllers/student.controller');

const router = express.Router();

router.post('/student/add-student', handlePostStudent);

module.exports = router;

const express = require('express');

const {handleAddTeacher,verifyEmail, login,forgotPassword, resetPassword,checkAuth} = require('../controllers/teacher.controller');
const {verifyToken} = require('../middlewares/verifyToken.js')

const router = express.Router();

router.get('/check-auth', verifyToken, checkAuth)

router.post('/register',handleAddTeacher);

router.post('/verify-email', verifyEmail);

router.post('/login', login );

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);

 module.exports = router;   
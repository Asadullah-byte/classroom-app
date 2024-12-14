const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    lastLogin:{
        type: Date,
        default: Date.now,
    },
    isVerified:{
        type:Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
     
    }]
},{timestamps: true});

const Teacher = mongoose.model('teacher', teacherSchema)

module.exports = Teacher;
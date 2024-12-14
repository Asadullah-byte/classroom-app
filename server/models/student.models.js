const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    rollno:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    courses:[{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }]
})
const Student = mongoose.model('student', studentSchema);
module.exports = Student;
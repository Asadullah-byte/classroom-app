const mongoose =require('mongoose');

const courseSchema = new mongoose.Schema({

    code: {
        type: String,
        required: true
    },
    
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    students: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Student' 
    }]

})
const Course = mongoose.model('course', courseSchema);

module.exports = Course;
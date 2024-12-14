const Student = require('../models/student.models');
const Course = require('../models/course.model');
const Teacher = require('../models/teacher.model');

async function handlePostStudent(req, res){
    const student = new Student(req.body);

        try{
            const newStudent = await student.save();

            await Course.findByIdAndUpdate( newStudent.courses ,{ $push :{students: newStudent._id}});


           return res.status(200).json({
                message: 'success',
                newStudent
            })

        }catch(err){
         return res.status(500).json({message: err.message})
        }
    
}

module.exports = {
    handlePostStudent,
}
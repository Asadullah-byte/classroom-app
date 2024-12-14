const Course = require('../models/course.model');
const Teacher = require('../models/teacher.model');

async function handlePostCourse(req, res){
    const course = new Course(req.body);
    try{
        const newCourse = await course.save();

        await Teacher.findByIdAndUpdate(newCourse.teacher, { $push: { courses: newCourse._id } });

        return res.status(200).json({message: "success" , newCourse});
    } catch(err){
        return res.status(500).json({message: err.message})
    }
};

async function handleGetAllCourse(req,res){
    try{
        const course = await Course.find();
        return res.status(200).json({message: 'success', course});
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    handlePostCourse,
    handleGetAllCourse,
}
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {connectionDb} = require('./connectionDB')
const Teacher = require('./routes/teacher.route');
const Course = require('./routes/course.route');
const Student = require('./routes/student.route');

dotenv.config();

const app = express();
const port = 3000;

//connection to mongoDb
connectionDb(process.env.MONGO_URI).then(()=>{console.log("MongoDb Connected!!")});


app.use(bodyParser.json({}));
app.use(cookieParser());
 
//routes 
app.use('/', Teacher);
app.use('/', Course );
app.use('/', Student );


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
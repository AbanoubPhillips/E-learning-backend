import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";

import bodyParser from 'body-parser';
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import studentRouter from "./router/student_router.js";
import instructorRouter from "./router/instructor_router.js";
import levelRouter from "./router/level_router.js";
import courseRouter from './router/course_router.js';
import lectureRouter from './router/lecture_router.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.options('*',cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use('/public/upload',express.static(__dirname + '/public/upload'));

// database connection 
mongoose.connect('mongodb://127.0.0.1:27017/we-study',{
    useNewUrlParser: true, 
    useUnifiedTopology: true ,
})
.then(()=>console.log("database connected"))
.catch((err)=>console.error(err));

// handle app routers
app.use("/api/v1/students",studentRouter);
app.use("/api/v1/instructors",instructorRouter);
app.use("/api/v1/levels",levelRouter);
app.use('/api/v1/courses',courseRouter);
app.use('/api/v1/lectures',lectureRouter);





// port
app.listen(3000);
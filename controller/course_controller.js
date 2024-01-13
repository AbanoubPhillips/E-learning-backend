import mongoose from 'mongoose';
import {Course} from '../model/course_model.js';
import { Student } from '../model/student_model.js';
import { Lecture } from '../model/lecture_model.js';

// Create a new course
export const createCourse =    async(req, res,next) => {

  try {
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;
    const course = new Course({ 
      title: req.body.title, 
      description: req.body.description, 
      image:`${basePath}${fileName}`,
      images:req.body.images,
      instructor: req.instructor
       });

    await course.save().then(()=>console.log("created")).catch((err)=>console.log(err));
    res.status(201).json(course);

  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Failed to create a new course' });
  }
  
};

// Get all courses
export const getAllCourses =  async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve courses' });
  }
};

// Get a single course by ID
export const getCourse =  async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({message:"invalid course id"});
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
     return res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the course' });
  }
};

// Update a course
export const updateCourse =  async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({message:"invalid course id"});
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, 
        price: req.body.price,
        description: req.body.description,
        lectures:req.body.lectures,
        image:req.body.image,
        images:req.body.images,
        instructor: req.body.instructor,
         },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ error: 'course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the course' });
  }
};

// Delete a product
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'course not found' });
    }
    res.json({ message: 'course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the course' });
  }
};


export const addStudentToCourse = async(req,res)=>{
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({message:"invalid course id"});
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
       return res.status(404).json({ error: 'course not found' });
    }
    
    if(course.students.includes(req.body.students))
      return res.status(400).json({message:"Student Already Added"});
      
    const jsonData = req.body.students;
    course.students.push(jsonData);
    await course.save();
    const student = await Student.findById(req.body.students);
    student.courses.push(req.params.id);
    await student.save();
    res.status(200).json({message:"Student added successfully"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


export const deleteStudentFromCourse = async(req,res)=>{
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({message:"invalid course id"});
  try {
    const jsonData = req.body.students;
    const course = await Course.findById(req.params.id);
    if (!course) {
       return res.status(404).json({ error: 'course not found' });
    }
    const array = course.students;
    if(array.includes(req.body.students)){
      array.splice(jsonData);
      await course.save();
      return res.status(200).json({message:"Student deleted successfully"});
    }
     res.status(404).json({message:"Student not found"});
   
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Get student courses 
export const getStudentCourses =  async (req, res) => {
  // let filter ={};
  // if(req.query.categories)
  //  filter = {category: req.query.categories.split(',')};
  try {
    const courses = await Course.find({students: req.params.id});
    if (!courses) {
      return res.status(404).json({ error: 'courses not found' });
    }
     return res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the courses' });
  }
};

export const addLectureToCourse = async(req,res)=>{
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({message:"invalid course id"});
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
       return res.status(404).json({ error: 'course not found' });
    }
    const jsonData = req.body.lectures;
    if(course.lectures.includes(jsonData))
      return res.status(400).json({message:"lecture Already Added"});
    course.lectures.push(jsonData);
    await course.save();
    const lecture = await Lecture.findById(jsonData);
    lecture.course = req.params.id;
    await lecture.save();
    res.status(200).json({message:"lecture added successfully"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


export const deleteLectureFromCourse = async(req,res)=>{
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({message:"invalid course id"});
  try {
    const jsonData = req.body.lectures;
    const course = await Course.findById(req.params.id);
    if (!course) {
       return res.status(404).json({ error: 'course not found' });
    }
    const array = course.lectures;
    if(array.includes(jsonData)){
      array.splice(jsonData);
      await course.save();
      return res.status(200).json({message:"lecture deleted successfully"});
    }
     res.status(404).json({message:"lecture not found"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Get student courses 
export const getCourseLectures =  async (req, res) => {
  // let filter ={};
  // if(req.query.categories)
  //  filter = {category: req.query.categories.split(',')};
  try {
    const courses = await Course.findById(req.params.id);
    if (!courses) {
      return res.status(404).json({ error: 'lectures not found' });
    }
     return res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the lectures' });
  }
};

// Get instructor courses 
export const getInstructorCourses =  async (req, res) => {
  // let filter ={};
  // if(req.query.categories)
  //  filter = {category: req.query.categories.split(',')};
  try {
    const courses = await Course.find({instructor: req.params.id}).populate('instructor');
    if (!courses) {
      return res.status(404).json({ error: 'courses not found' });
    }
     return res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the courses' });
  }
};






export const uploadImages =  async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
     return res.status(400).json({message:"invalid course id"});
  const files = req.files;
  const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;
  let imagesPath = [];
  if(files){
    files.map(file=>{
      imagesPath.push(`${basePath}${file.filename}`);
    })
  }
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { 
        images:imagesPath,
         },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ error: 'course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the course' });
  }
};

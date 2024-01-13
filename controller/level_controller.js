import { Course } from "../model/course_model.js";
import {Level} from "../model/level_model.js";
import { Student } from "../model/student_model.js";
// Register a new user
export const createLevel = async (req, res) => {
    try {
      const { name } = req.body;
      const existingLevel = await Level.findOne({ name:name });
      if (existingLevel) {
        return res.status(400).json({ error: 'Level already Created' });
      }
      const level = new Level({
        name: req.body.name
       });
      await level.save();
      res.status(201).json(level);
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: 'Failed to Create a new level' });
    }
  };

  // Get all levels
export const getAllLevels = async (req, res) => {
    try {
      const levels = await Level.find().select("id name");
      res.json(levels);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve levels' });
    }
  };

  // Get  level
export const getLevelById = async (req, res) => {
  const id = req.params.id;
  try {
    const levelxist = await Level.findById(id);
    if (!levelxist) {
      return res.status(404).json({ error: 'Level Not Found' });
    }
    res.json(levelxist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve Level' });
  }
};


 // Update a level
 export const updateLevel = async (req, res) => {
    try {
      const { name, courses, students } = req.body;
      const level = await Level.findByIdAndUpdate(
        req.params.id,
        { name, courses, students },
        { new: true }
      );
      if (!level) {
        return res.status(404).json({ error: 'Level not found' });
      }
      res.json(level);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the level' });
    }
  };
  
  // Delete a level
export const deleteLevel = async (req, res) => {
    try {
      const level = await Level.findByIdAndDelete(req.params.id);
      if (!level) {
        return res.status(404).json({ error: 'Level not found' });
      }
      res.json({ message: 'Level deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete level' });
    }
  };

  
export const addStudentToLevel = async(req,res)=>{
  //if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({message:"invalid level id"});
  try {
    const level = await Level.findById(req.params.id);
    if (!level) {
       return res.status(404).json({ error: 'level not found' });
    }
    const jsonData = req.body.students;
    if(level.students.includes(jsonData))
      return res.status(400).json({message:"Student Already Added"});
    
    level.students.push(jsonData);
    await level.save();
    const student = await Student.findById(jsonData);
    student.level = req.params.id;
    await student.save();
    res.status(200).json({message:"Student added successfully"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


export const deleteStudentFromLevel = async(req,res)=>{
 // if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({message:"invalid course id"});
  try {
    const level = await Level.findById(req.params.id);
    if (!level) {
       return res.status(404).json({ error: 'level not found' });
    }
    const jsonData = req.body.students;
    const array = level.students;
    if(array.includes(jsonData)){
      array.splice(jsonData);
      await level.save();
      const student = await Student.findById(jsonData);
      student.level = null;
      await student.save();
      return res.status(200).json({message:"Student deleted successfully"});
    }
    return res.status(404).json({message:"Student not found"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Get student courses 
export const getLevelStudents =  async (req, res) => {
  // let filter ={};
  // if(req.query.categories)
  //  filter = {category: req.query.categories.split(',')};
  try {
    const level = await Level.findById(req.params.id);
    if (!level) {
      return res.status(404).json({ error: 'level not found' });
    }
     return res.json(level);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the level' });
  }
};

 
export const addCourseToLevel = async(req,res)=>{
  //if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({message:"invalid level id"});
  try {
    const level = await Level.findById(req.params.id);
    if (!level) {
       return res.status(404).json({ error: 'level not found' });
    }
    const jsonData = req.body.courses;
    if(level.courses.includes(jsonData))
      return res.status(400).json({message:"course Already Added"});
    
    level.courses.push(jsonData);
    await level.save();
    res.status(200).json({message:"Course added successfully"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


export const deleteCourseFromLevel = async(req,res)=>{
 // if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({message:"invalid course id"});
  try {
    const level = await Level.findById(req.params.id);
    if (!level) {
       return res.status(404).json({ error: 'level not found' });
    }
    const jsonData = req.body.courses;
    const array = level.courses;
    if(array.includes(jsonData)){
      array.splice(jsonData);
      await level.save();
      return res.status(200).json({message:"course deleted successfully"});
    }
    return res.status(404).json({message:"course not found"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Get student courses 
export const getLevelCourses =  async (req, res) => {
  // let filter ={};
  // if(req.query.categories)
  //  filter = {category: req.query.categories.split(',')};
  try {
    const level = await Level.findById(req.params.id);
    if (!level) {
      return res.status(404).json({ error: 'level not found' });
    }
     return res.json(level);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the level' });
  }
};


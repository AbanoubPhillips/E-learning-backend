import mongoose from 'mongoose';
import {Lecture} from '../model/lecture_model.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from'fs';

cloudinary.config({
  cloud_name: 'doqkyyp3p',
  api_key: '693658788326261',
  api_secret: 'huWb7sluZH71oa5sfMjzafk2wdw',
});
// Create a new lecture
export const createLecture =    async(req, res,next) => {
   
        try {  
   let imageResult;
   if (req.files.image) {
     imageResult = await cloudinary.uploader.upload(req.files.image[0].path,{
      resource_type: 'image',
    });
     fs.unlinkSync(req.files.image[0].path); // Remove the temporary image file
   }

   // Uploading video to Cloudinary (if available)
   let videoResult;
   if (req.files.videoUrl) {
     videoResult = await cloudinary.uploader.upload(req.files.videoUrl[0].path, {
       resource_type: 'video',
     });
     fs.unlinkSync(req.files.videoUrl[0].path); // Remove the temporary video file
   }

   // Uploading PDF to Cloudinary (if available)
   let pdfResult;
   if (req.files.pdfUrl) {
     pdfResult = await cloudinary.uploader.upload(req.files.pdfUrl[0].path, {
       resource_type: 'raw',
     });
     fs.unlinkSync(req.files.pdfUrl[0].path); // Remove the temporary PDF file
   }

          const lecture = new Lecture({ 
            title: req.body.title, 
            description: req.body.description, 
             image:imageResult?.secure_url,
            videoUrl:videoResult?.secure_url,
            pdfUrl:pdfResult?.secure_url
             });
           await lecture.save().then(()=>console.log("created")).catch((err)=>console.log(err));
          res.status(201).json(lecture);
        } catch (error) {
        }
      
  
};

// Get all lectures
export const getAllLectures =  async (req, res) => {
  try {
    const lectures = await Lecture.find();
    res.json(lectures);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve lectures' });
  }
};

// Get a single lecture by ID
export const getLecture =  async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({message:"invalid lectures id"});
  try {
    const lecture = await Lecture.findById(req.params.id);
    if (!lecture) {
      return res.status(404).json({ error: 'lecture not found' });
    }
     return res.json(lecture);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the lecture' });
  }
};

// Update a lecture
export const updateLecture =  async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({message:"invalid lecture id"});
  try {
    let imageResult;
   if (req.files.image) {
     imageResult = await cloudinary.uploader.upload(req.files.image[0].path,{
      resource_type: 'image',
    });
     fs.unlinkSync(req.files.image[0].path); // Remove the temporary image file
   }

   // Uploading video to Cloudinary (if available)
   let videoResult;
   if (req.files.videoUrl) {
     videoResult = await cloudinary.uploader.upload(req.files.videoUrl[0].path, {
       resource_type: 'video',
     });
     fs.unlinkSync(req.files.videoUrl[0].path); // Remove the temporary video file
   }

   // Uploading PDF to Cloudinary (if available)
   let pdfResult;
   if (req.files.pdfUrl) {
     pdfResult = await cloudinary.uploader.upload(req.files.pdfUrl[0].path, {
       resource_type: 'raw',
     });
     fs.unlinkSync(req.files.pdfUrl[0].path); // Remove the temporary PDF file
   }
    const lecture = await Lecture.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, 
        description: req.body.description, 
        image:imageResult?.image,
        videoUrl:videoResult?.videoUrl,
        pdfUrl:pdfResult?.pdfUrl
         },
      { new: true }
    );
    if (!lecture) {
      return res.status(404).json({ error: 'lecture not found' });
    }
    res.json(lecture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Lecture
export const deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndDelete(req.params.id);
    if (!lecture) {
      return res.status(404).json({ error: 'lecture not found' });
    }
    res.json({ message: 'lecture deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the lecture' });
  }
};



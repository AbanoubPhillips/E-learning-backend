
import express from "express";
const router = express.Router();
import multer from "multer";
import upload  from '../middleware/upload_video.js';
import { createLecture, deleteLecture, getAllLectures, getLecture, updateLecture } from "../controller/lecture_controller.js";

// const uploadOptions = multer({ storage: storage });

router.post('/', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'videoUrl', maxCount: 1 },
  { name: 'pdfUrl', maxCount: 1 },
]),createLecture);

router.get('/',getAllLectures);
router.get('/:id',getLecture);
router.put('/:id',upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'videoUrl', maxCount: 1 },
  { name: 'pdfUrl', maxCount: 1 }]),updateLecture);
router.delete('/:id',deleteLecture );

export default router;

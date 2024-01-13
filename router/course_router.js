import express from "express";
import { addLectureToCourse, addStudentToCourse, createCourse, deleteCourse, deleteLectureFromCourse, deleteStudentFromCourse, getAllCourses, getCourse, getCourseLectures, getInstructorCourses, getStudentCourses, updateCourse, uploadImages } from "../controller/course_controller.js";
const router = express.Router();
import multer from "multer";

const FIND_TYPE_MAP ={
  "image/png":"png",
  "image/jpeg":"jpeg",
  "image/jpg":"jpg",
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FIND_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if(isValid){
      uploadError = null;
    }
    cb(uploadError, 'public/upload')
  },
  filename: function (req, file, cb) {
    const extension = FIND_TYPE_MAP[file.mimetype];
 const fileName = file.originalname.split(' ').join('-');
    cb(null, `${fileName }-${Date.now()}.${extension}`);
  }
})

const uploadOptions = multer({ storage: storage });

router.post('/',uploadOptions.single('image'),createCourse);
router.get('/',getAllCourses);
router.get('/:id',getCourse);
router.put('/:id',updateCourse);
router.put('/course-images/:id',uploadOptions.array('images',10),uploadImages);
router.delete('/:id',deleteCourse );
router.get('/getInstructorCourses/:id',getInstructorCourses);


router.get('/getStudentCourses/:id',getStudentCourses);
router.post('/addStudentToCourse/:id',addStudentToCourse);
router.delete('/deleteStudentFromCourse/:id',deleteStudentFromCourse);

router.get('/getCourseLectures/:id',getCourseLectures);
router.post('/addLectureToCourse/:id',addLectureToCourse);
router.delete('/deleteLectureFromCourse/:id',deleteLectureFromCourse);

export default router;

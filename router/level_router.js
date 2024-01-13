import express from "express";
import { addCourseToLevel, addStudentToLevel, createLevel, deleteCourseFromLevel, deleteLevel, deleteStudentFromLevel, getAllLevels, getLevelById, getLevelCourses, getLevelStudents, updateLevel } from "../controller/level_controller.js";
const router = express.Router();



router.post('/',createLevel);
router.get('/',getAllLevels);
router.get('/:id',getLevelById)
router.put('/:id',updateLevel);
router.delete('/:id',deleteLevel);

router.post('/addStudentToLevel/:id',addStudentToLevel);
router.delete('/deleteStudentFromLevel/:id',deleteStudentFromLevel);
router.get('/getLevelStudents/:id',getLevelStudents);

router.post('/addCourseToLevel/:id',addCourseToLevel);
router.delete('/deleteCourseFromLevel/:id',deleteCourseFromLevel);
router.get('/getLevelCourses/:id',getLevelCourses);


export default router;
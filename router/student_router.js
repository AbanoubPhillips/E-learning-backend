import express from "express";
import { deleteUser, getAllUsers, getUserById, login, register, updateUser } from "../controller/student_controller.js";
import { authMiddleware } from "../middleware/user_middleware.js";
const router = express.Router();


router.post('/register',register);
router.post('/login',login);
router.get('/',authMiddleware,getAllUsers);
router.get('/:id',authMiddleware,getUserById);
router.put('/:id',authMiddleware,updateUser);
router.delete('/:id',authMiddleware,deleteUser);



export default router;


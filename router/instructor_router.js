import express from "express";
import { deleteUser, getAllUsers, getUserById, login, register, updateUser } from "../controller/instuctor_controller.js";
const router = express.Router();


router.post('/register',register);
router.post('/login',login);
router.get('/',getAllUsers);
router.get('/:id',getUserById)
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);

export default router;


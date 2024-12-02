import express from 'express';
import {
    registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser
} from "../controllers/userController.js"

const router = express.Router()

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getUsers', getAllUsers);
router.get('/getUser/:id', getUserById);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);

export default router;
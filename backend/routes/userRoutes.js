import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';

const userRouter = express.Router();

// Correct handlers
userRouter.post('/register', registerUser); // ✅ Register route
userRouter.post('/login', loginUser);       // ✅ Login route
userRouter.post('/admin', adminLogin);      // ✅ Admin login route

export default userRouter;

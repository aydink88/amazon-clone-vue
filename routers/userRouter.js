import express from 'express';
import {
  deleteUser,
  getTopSellers,
  getUser,
  getUsers,
  register,
  seedUsers,
  signin,
  updateProfile,
  updateUser,
} from '../controllers/userController.js';
import { isAdmin, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.get('/top-sellers', getTopSellers);
userRouter.get('/seed', seedUsers);
userRouter.post('/register', register);
userRouter.post('/signin', signin);
userRouter.get('/:id', getUser);
userRouter.put('/profile', isAuth, updateProfile);
userRouter.get('/', isAuth, isAdmin, getUsers);
userRouter.delete('/:id', isAuth, isAdmin, deleteUser);
userRouter.put('/:id', isAuth, isAdmin, updateUser);

export default userRouter;

import { Router } from 'express';
import { addUsers, getAllUsers, getAllUsersBasicInfo, getUserById } from '../controllers/userController';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/basic', getAllUsersBasicInfo);
userRouter.get('/:id', getUserById);

userRouter.post('/', addUsers);

export default userRouter;

import { Router } from 'express';
import { addComments, getFilteredComments } from '../controllers/commentController';

const commentRouter = Router();

commentRouter.get('/', getFilteredComments);

commentRouter.post('/', addComments);

export default commentRouter;

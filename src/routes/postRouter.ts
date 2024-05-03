import { Router } from 'express';
import { addPosts, getAllPosts, getBasicPost, getPostCommentsById, getPostsById } from '../controllers/postController';

const postRouter = Router();

postRouter.get('/', getAllPosts);
postRouter.get('/basic', getBasicPost);
postRouter.get('/:id', getPostsById);
postRouter.get('/:id/comments', getPostCommentsById);

postRouter.post('/', addPosts);

export default postRouter;

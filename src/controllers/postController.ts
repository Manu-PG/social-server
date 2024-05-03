import { Request, Response } from 'express';
import postModel from '../models/postModel';
import { getFilteredComments } from './commentController';

export const getAllPosts = (req: Request, res: Response) => {
  postModel
    .find()
    .sort({ updatedAt: 'desc' })
    .skip((Number(req.query._page) - 1) * 10)
    .limit(Number(req.query._limit))
    //.populate('userId')
    .then((postDocs) => res.json(postDocs))
    .catch((error) => res.status(500).json({ error: (error as Error).message }));
};

export const getBasicPost = (req: Request, res: Response) => {
  postModel
    .find()
    //.populate('userId')
    .then((postDocs) =>
      res.json(
        postDocs.map(({ _id, body, userId }) => {
          return {
            _id,
            body,
            user: userId.name,
          };
        })
      )
    )
    .catch((error) => res.status(500).json({ error: (error as Error).message }));
};

export const getPostsById = (req: Request, res: Response) => {
  postModel
    .findById(req.params.id)
    .then((postDocs) => res.json(postDocs))
    .catch((error) => res.status(500).json({ error: (error as Error).message }));
};

export const addPosts = (req: Request, res: Response) => {
  postModel
    .create(req.body)
    .then((postDoc) => res.status(200).json(postDoc))
    .catch((error) => res.status(500).json({ error: (error as Error).message }));
};

export const getPostCommentsById = (req: Request, res: Response) => {
  req.query = { postId: req.params.id };
  getFilteredComments(req, res);
};

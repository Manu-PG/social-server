import { Request, Response } from 'express';
import commentModel from '../models/commentModel';

export const getFilteredComments = (req: Request, res: Response) => {
  commentModel
    .find(req.query)
    .then((commentsDocs) => res.json(commentsDocs))
    .catch((error) => res.status(500).json({ error: (error as Error).message }));
};

export const addComments = (req: Request, res: Response) => {
  commentModel
    .create(req.body)
    .then((commentsDocs) => res.status(200).json(commentsDocs))
    .catch((error) => res.status(500).json({ error: (error as Error).message }));
};

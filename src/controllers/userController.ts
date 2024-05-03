import { Request, Response } from 'express';
import userModel from '../models/userModel';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const userDocs = await userModel.find();
    res.json(userDocs);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllUsersBasicInfo = async (req: Request, res: Response) => {
  try {
    const userDocs = await userModel.find();

    res.json(
      userDocs.map(({ _id, name, email }) => {
        return {
          _id,
          name,
          email,
        };
      })
    );
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getUserById = (req: Request, res: Response) => {
  userModel
    .findById(req.params.id)
    .then((userDoc) => res.json(userDoc))
    .catch((error) => res.status(500).json({ error: (error as Error).message }));
};

export const addUsers = (req: Request, res: Response) => {
  userModel
    .create(req.body)
    .then((userDoc) => res.status(200).json(userDoc))
    .catch((error) => res.status(500).json({ error: (error as Error).message }));
};

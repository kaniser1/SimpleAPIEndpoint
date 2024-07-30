import { Router, Request, Response } from "express";
import { User } from "../models/user";

export const usersRouter: Router = Router();

usersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error });
  }
});

import { Request, NextFunction, Response } from "express";
import { userServices } from "../services/userServices";
import { userRepository } from "../repositories/userRepository";
import { userUUIDSchema } from "../validations/userUUIDSchema";
import { userSchema } from "../validations/userSchema";

export const userControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = userSchema.parse(req.body);

      const userCreated = await userServices.create(
        { name, email, password },
        userRepository
      );

      return res.status(201).json({ message: "user created!", userCreated });
    } catch (error) {
      return next(error);
    }
  },

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = userUUIDSchema.parse(req.params);

      const userData = await userServices.read(id, userRepository);

      return res.status(200).json(userData);
    } catch (error) {
      return next(error);
    }
  },
};

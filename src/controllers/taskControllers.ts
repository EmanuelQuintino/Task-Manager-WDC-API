import { Request, NextFunction, Response } from "express";
import { taskServices } from "../services/taskServices";
import { taskRepository } from "../repositories/taskRepository";
import { taskSchema } from "../validations/taskSchema";
import { UUIDSchema } from "../validations/UUIDSchema";

export const taskControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date } = taskSchema.parse(req.body);
      const { id } = UUIDSchema("user").parse({ id: req.userID });

      const taskCreated = await taskServices.create(
        { title, description, date, user_id: id },
        taskRepository
      );

      return res.status(201).json({ message: "task created!", taskCreated });
    } catch (error) {
      return next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = UUIDSchema("task").parse(req.params);
      const userID = UUIDSchema("user").parse({ id: req.userID });
      const { title, description, date } = taskSchema.parse(req.body);

      const taskUpdated = await taskServices.update(
        id,
        { title, description, date, user_id: userID.id },
        taskRepository
      );

      return res.status(201).json({ message: "task updated!", taskUpdated });
    } catch (error) {
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = UUIDSchema("task").parse(req.params);

      const taskDeleted = await taskServices.delete(id, taskRepository);

      return res.status(200).json({ message: "task was deleted!", taskDeleted });
    } catch (error) {
      return next(error);
    }
  },
};

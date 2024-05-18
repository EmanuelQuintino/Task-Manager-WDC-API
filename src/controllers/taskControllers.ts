import { Request, NextFunction, Response } from "express";
import { string, z } from "zod";
import { taskServices } from "../services/taskServices";
import { taskRepository } from "../repositories/taskRepository";
import { taskSchema } from "../validations/taskSchema";
import { UUIDSchema } from "../validations/UUIDSchema";

export const taskControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, user_id } = taskSchema.parse(req.body);

      const taskCreated = await taskServices.create(
        { title, description, date, user_id },
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
      const { title, description, date, user_id } = taskSchema.parse(req.body);

      const taskUpdated = await taskServices.update(
        id,
        { title, description, date, user_id },
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

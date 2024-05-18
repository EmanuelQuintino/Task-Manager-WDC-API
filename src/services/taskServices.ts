import { randomUUID } from "node:crypto";
import { appError } from "../errors/appError";
import { TaskDataTypes } from "../validations/taskSchema";

export type CreateTaskDataTypes = TaskDataTypes & { user_id: string };

type Repository = {
  createTask(data: CreateTaskDataTypes): Promise<{} | undefined>;
  updateTask(data: CreateTaskDataTypes): Promise<{} | undefined>;
  deleteTaskByID(id: string): Promise<{} | undefined>;
};

export const taskServices = {
  async create(data: CreateTaskDataTypes, repository: Repository) {
    try {
      const { title, description, date, user_id } = data;

      const task = {
        id: randomUUID(),
        title,
        description,
        date,
        user_id,
      };

      const taskCreated = await repository.createTask(task);

      return taskCreated;
    } catch (error) {
      throw error;
    }
  },

  async update(id: string, data: CreateTaskDataTypes, repository: Repository) {
    try {
      const { title, description, date, user_id } = data;

      const task = {
        id,
        title,
        description,
        date,
        user_id,
        updated_at: new Date()
          .toISOString()
          .replace("T", " ")
          .replace("Z", "")
          .split(".")[0],
      };

      const taskCreated = await repository.updateTask(task);

      return taskCreated;
    } catch (error) {
      throw error;
    }
  },

  async delete(id: string, repository: Repository) {
    try {
      const deleteTaskResult = await repository.deleteTaskByID(id);

      if (!deleteTaskResult) throw appError("task not deleted!", 400);

      return id;
    } catch (error) {
      throw error;
    }
  },
};

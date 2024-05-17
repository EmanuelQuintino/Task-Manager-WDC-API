import { randomUUID } from "node:crypto";
import { TaskDataCreate } from "../repositories/taskRepository";
import { appError } from "../errors/appError";
import { TaskDataTypes } from "../validations/taskSchema";

type Repository = {
  createTask(data: TaskDataCreate): Promise<{} | undefined>;
  updateTask(data: TaskDataCreate): Promise<{} | undefined>;
  getTaskByID(id: string): Promise<{}>;
  deleteTaskByID(id: string): Promise<{}>;
};

export const taskServices = {
  async create(data: TaskDataTypes, repository: Repository) {
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

  async update(id: string, data: TaskDataTypes, repository: Repository) {
    try {
      const { title, description, date, user_id } = data;

      const task = {
        id,
        title,
        description,
        date,
        user_id,
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

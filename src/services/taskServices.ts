import { randomUUID } from "node:crypto";
import { AppError } from "../errors/appError";
import { TaskDataTypes } from "../validations/taskSchema";
import { PaginationDataTypes } from "../validations/paginationSchema";
import { CreateTaskDataTypes, UpdateTaskDataTypes } from "../repositories/taskRepository";

export type TaskDataCreate = TaskDataTypes & { user_id: string };
export type PaginationTasks = PaginationDataTypes & { userID: string };

export type TaskRepositoryTypes = {
  createTask(data: TaskDataCreate): Promise<CreateTaskDataTypes | undefined>;
  getTaskByID(id: string): Promise<CreateTaskDataTypes | undefined>;
  getTasks(data: PaginationTasks): Promise<CreateTaskDataTypes[] | undefined>;
  updateTask(data: UpdateTaskDataTypes): Promise<UpdateTaskDataTypes | undefined>;
  deleteTaskByID(id: string): Promise<{ id: string } | undefined>;
};

export const taskServices = {
  async create(
    { title, description, date, status, user_id }: TaskDataCreate,
    repository: TaskRepositoryTypes
  ) {
    try {
      if (new Date(date) < new Date()) {
        throw new AppError("date cannot be before the current time!", 400);
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        date,
        status: status || "pending",
        user_id,
      };

      const taskCreated = await repository.createTask(task);

      return taskCreated;
    } catch (error) {
      throw error;
    }
  },

  async read(
    { userID, limit, offset, filter }: PaginationTasks,
    repository: TaskRepositoryTypes
  ) {
    try {
      if (!limit || !offset || !filter) {
        throw new AppError("please inform query params limit, offset and filter!", 400);
      }

      const userTasks = await repository.getTasks({ userID, limit, offset, filter });

      return userTasks;
    } catch (error) {
      throw error;
    }
  },

  async update(
    id: string,
    { title, description, date, status, user_id }: TaskDataCreate,
    repository: TaskRepositoryTypes
  ) {
    try {
      const task = await repository.getTaskByID(id);
      if (!task) throw new AppError("task not found!", 404);

      if (task.user_id != user_id) {
        throw new AppError("user not authorized to update task!", 401);
      }

      const taskToUpdate = {
        id,
        title,
        description,
        date,
        status: status || "pending",
        user_id,
        updated_at: new Date(),
      };

      const taskUpdated = await repository.updateTask(taskToUpdate);

      return taskUpdated;
    } catch (error) {
      throw error;
    }
  },

  async delete(id: string, user_id: string, repository: TaskRepositoryTypes) {
    try {
      const task = await repository.getTaskByID(id);
      if (!task) throw new AppError("task not found!", 404);

      if (task.user_id != user_id) {
        throw new AppError("user not authorized to delete task!", 401);
      }

      const taskDeleted = await repository.deleteTaskByID(id);

      if (!taskDeleted) throw new AppError("task not deleted!", 500);

      return taskDeleted;
    } catch (error) {
      throw error;
    }
  },
};

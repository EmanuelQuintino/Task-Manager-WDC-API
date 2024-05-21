import { randomUUID } from "node:crypto";
import { appError } from "../errors/appError";
import { TaskDataTypes } from "../validations/taskSchema";
import { PaginationDataTypes } from "../validations/paginationSchema";

export type CreateTaskDataTypes = TaskDataTypes & { user_id: string };
export type UserTasksPagination = PaginationDataTypes & { userID: string };

type Repository = {
  createTask(data: CreateTaskDataTypes): Promise<{} | undefined>;
  getTask(id: string): Promise<{ user_id: string } | undefined>;
  updateTask(data: CreateTaskDataTypes): Promise<{} | undefined>;
  deleteTaskByID(id: string, user_id: string): Promise<{} | undefined>;
  getTasks({
    userID,
    limit,
    offset,
    status,
  }: UserTasksPagination): Promise<{} | undefined>;
};

export const taskServices = {
  async create(data: CreateTaskDataTypes, repository: Repository) {
    try {
      const { title, description, date, status, user_id } = data;

      if (new Date(date) < new Date()) {
        throw appError("date cannot be before the current time!", 400);
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        date,
        status,
        user_id,
      };

      const taskCreated = await repository.createTask(task);

      return taskCreated;
    } catch (error) {
      throw error;
    }
  },

  async read(data: UserTasksPagination, repository: Repository) {
    try {
      const { userID, limit, offset, status } = data;

      if (!limit || !offset || !status) {
        throw appError("please inform query params limit, offset and status!", 400);
      }

      const userTasks = await repository.getTasks({ userID, limit, offset, status });

      return { userTasks };
    } catch (error) {
      throw error;
    }
  },

  async update(id: string, data: CreateTaskDataTypes, repository: Repository) {
    try {
      const { title, description, date, status, user_id } = data;

      if (new Date(date) < new Date()) {
        throw appError("date cannot be before the current time!", 400);
      }

      const task = await repository.getTask(id);
      if (!task) throw appError("task not found!", 404);

      if (task.user_id != user_id) {
        throw appError("user not authorized to update task!", 401);
      }

      const taskToUpdate = {
        id,
        title,
        description,
        date,
        status,
        user_id,
        updated_at: new Date()
          .toISOString()
          .replace("T", " ")
          .replace("Z", "")
          .split(".")[0],
      };

      const taskCreated = await repository.updateTask(taskToUpdate);

      return taskCreated;
    } catch (error) {
      throw error;
    }
  },

  async delete(id: string, user_id: string, repository: Repository) {
    try {
      const task = await repository.getTask(id);
      if (!task) throw appError("task not found!", 404);

      if (task.user_id != user_id) {
        throw appError("user not authorized to delete task!", 401);
      }

      const deleteTaskResult = await repository.deleteTaskByID(id, user_id);

      if (!deleteTaskResult) throw appError("task not deleted!", 400);

      return id;
    } catch (error) {
      throw error;
    }
  },
};

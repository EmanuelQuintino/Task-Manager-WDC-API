import { sqliteConnection } from "../databases/sqlite3";
import { AppError } from "../errors/appError";
import { TaskDataCreate, PaginationTasks } from "../services/taskServices";

export type CreateTaskDataTypes = TaskDataCreate & { id: string };
export type UpdateTaskDataTypes = CreateTaskDataTypes & { updated_at: Date };

export const taskRepository = {
  async createTask({
    id,
    title,
    description,
    date,
    status,
    user_id,
  }: CreateTaskDataTypes) {
    try {
      const db = await sqliteConnection();

      const querySQL = `
        INSERT INTO tasks (id, title, description, date, status, user_id)
        VALUES (?, ?, ?, ?, ?, ?);
      `;

      await db.run(querySQL, [id, title, description, date, status, user_id]);

      return { id, title, description, date, status, user_id };
    } catch (error) {
      throw error;
    }
  },

  async getTaskByID(id: string) {
    try {
      const db = await sqliteConnection();

      const querySQL = "SELECT * FROM tasks WHERE id = ?;";
      const task = await db.get(querySQL, [id]);

      return task;
    } catch (error) {
      throw error;
    }
  },

  async getTasks({ userID, limit, offset, filter }: PaginationTasks) {
    try {
      const db = await sqliteConnection();
      let querySQL = "";
      let tasks = [];

      switch (filter) {
        case "all":
          querySQL = `
            SELECT * FROM tasks 
            WHERE user_id = ?
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?;
          `;
          tasks = await db.all(querySQL, [userID, limit, offset]);
          break;

        case "completed":
          querySQL = `
            SELECT * FROM tasks 
            WHERE user_id = ? AND status = 'completed'
            ORDER BY created_at DESC 
            LIMIT ? OFFSET ?;
          `;
          tasks = await db.all(querySQL, [userID, limit, offset]);
          break;

        case "pending":
          querySQL = `
            SELECT * FROM tasks 
            WHERE user_id = ? AND status = 'pending' AND date >= CURRENT_DATE
            ORDER BY created_at DESC 
            LIMIT ? OFFSET ?;
          `;
          tasks = await db.all(querySQL, [userID, limit, offset]);
          break;

        case "late":
          querySQL = `
            SELECT * FROM tasks 
            WHERE user_id = ? AND status = 'pending' AND date < CURRENT_DATE
            ORDER BY created_at DESC 
            LIMIT ? OFFSET ?;
          `;
          tasks = await db.all(querySQL, [userID, limit, offset]);
          break;

        default:
          throw new AppError("invalid filter!", 400);
      }

      return tasks;
    } catch (error) {
      throw error;
    }
  },

  async updateTask({
    id,
    title,
    description,
    date,
    status,
    user_id,
    updated_at,
  }: UpdateTaskDataTypes) {
    try {
      const db = await sqliteConnection();

      const querySQL = `
        UPDATE tasks 
        SET title = ?, description = ?, date = ?, status = ?, updated_at = ?
        WHERE id = ? AND user_id = ?;
      `;

      await db.run(querySQL, [title, description, date, status, updated_at, id, user_id]);

      return { id, title, description, date, status, user_id, updated_at };
    } catch (error) {
      throw error;
    }
  },

  async deleteTaskByID(id: string) {
    try {
      const db = await sqliteConnection();

      const querySQL = "DELETE FROM tasks WHERE id = ?;";
      await db.run(querySQL, [id]);

      return { id };
    } catch (error) {
      throw error;
    }
  },
};

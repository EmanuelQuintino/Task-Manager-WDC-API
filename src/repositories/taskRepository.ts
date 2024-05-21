import { sqliteConnection } from "../databases/sqlite3";
import { CreateTaskDataTypes, UserTasksPagination } from "../services/taskServices";

type TaskDataCreate = CreateTaskDataTypes & { id: string };
type TaskDataUpdate = TaskDataCreate & { updated_at: Date };

export const taskRepository = {
  async createTask({ id, title, description, date, status, user_id }: TaskDataCreate) {
    try {
      const db = await sqliteConnection();

      const querySQL =
        "INSERT INTO tasks (id, title, description, date, status, user_id) VALUES (?, ?, ?, ?, ?. ?)";

      await db.run(querySQL, [id, title, description, date, status, user_id]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  async getTask(id: string) {
    try {
      const db = await sqliteConnection();

      const quarySQL = "SELECT * FROM tasks WHERE id = ?;";
      const task = await db.get(quarySQL, [id]);

      return task;
    } catch (error) {
      throw error;
    }
  },

  async getTasks({ userID, limit, offset, status }: UserTasksPagination) {
    try {
      const db = await sqliteConnection();

      if (status == "all") {
        const querySQL = `
          SELECT * FROM tasks 
          WHERE user_id = ?
          ORDER BY created_at DESC 
          LIMIT ? OFFSET ?;
        `;

        const tasks = await db.all(querySQL, [userID, limit, offset]);

        return tasks;
      } else {
        const querySQL = `
          SELECT * FROM tasks 
          WHERE user_id = ? AND status = ?
          ORDER BY created_at DESC 
          LIMIT ? OFFSET ?;
        `;

        const tasks = await db.all(querySQL, [userID, status, limit, offset]);

        return tasks;
      }
    } catch (error) {
      throw error;
    }
  },

  async updateTask({ id, title, description, date, status, updated_at }: TaskDataUpdate) {
    try {
      const db = await sqliteConnection();

      const querySQL = `
        UPDATE tasks 
        SET title = ?, description = ?, date = ?, status = ?, updated_at = ?
        WHERE id = ?;
      `;

      await db.run(querySQL, [title, description, date, status, updated_at, id]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  async deleteTaskByID(id: string) {
    try {
      const db = await sqliteConnection();

      const querySQL = "DELETE FROM tasks WHERE id == ?";
      const deleteTaskResult = await db.run(querySQL, [id]);

      return deleteTaskResult;
    } catch (error) {
      throw error;
    }
  },
};

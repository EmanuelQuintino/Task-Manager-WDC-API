import { sqliteConnection } from "../databases/sqlite3";
import { appError } from "../errors/appError";
import { CreateTaskDataTypes } from "../services/taskServices";

type TaskDataCreate = CreateTaskDataTypes & { id: string };
type TaskDataUpdate = TaskDataCreate & { updated_at: Date };

export const taskRepository = {
  async createTask({ id, title, description, date, user_id }: TaskDataCreate) {
    try {
      const db = await sqliteConnection();

      const querySQL =
        "INSERT INTO tasks (id, title, description, date, user_id) VALUES (?, ?, ?, ?, ?)";

      await db.run(querySQL, [id, title, description, date, user_id]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  async updateTask({
    id,
    title,
    description,
    date,
    user_id,
    updated_at,
  }: TaskDataUpdate) {
    try {
      const db = await sqliteConnection();

      const querySQL = `
        UPDATE tasks 
        SET title = ?, description = ?, date = ?, user_id = ?, updated_at = ?
        WHERE id = ?;
      `;

      await db.run(querySQL, [title, description, date, user_id, updated_at, id]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  async deleteTaskByID(id: string) {
    try {
      const db = await sqliteConnection();

      const tasksQuerySQL = "DELETE FROM tasks WHERE id == ?";
      const deleteTaskResult = await db.run(tasksQuerySQL, [id]);

      if (deleteTaskResult.changes == 0) throw appError("task not found!", 404);

      return deleteTaskResult;
    } catch (error) {
      throw error;
    }
  },
};

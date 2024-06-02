import { sqliteConnection } from "../databases/sqlite3";
import { UserDataTypes } from "../validations/userSchema";

export type CreateUserDataType = UserDataTypes & { id: string };

export const userRepository = {
  async createUser(data: CreateUserDataType) {
    try {
      const { id, name, email, password } = data;

      const db = await sqliteConnection();

      const querySQL =
        "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)";

      await db.run(querySQL, [id, name, email, password]);

      return { id, name, email, password };
    } catch (error) {
      throw error;
    }
  },

  async getUserByID(id: string) {
    try {
      const db = await sqliteConnection();

      const queryUserSQL = "SELECT * FROM users WHERE id == ?";
      const user = await db.get(queryUserSQL, [id]);

      const queryTasksSQL = `
        SELECT
          COUNT(*) AS total,
          SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
          SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed,
          SUM(CASE WHEN date < CURRENT_DATE THEN 1 ELSE 0 END) AS late
        FROM tasks
        WHERE user_id = ?;
      `;

      const dataTasks = await db.get(queryTasksSQL, [id]);

      const tasksInfo = {
        total: dataTasks.total,
        completed: { total: dataTasks.completed || 0 },
        pending: {
          total: dataTasks.pending || 0,
          open: (dataTasks.pending || 0) - (dataTasks.late || 0),
          late: dataTasks.late || 0,
        },
      };

      return { ...user, tasksInfo };
    } catch (error) {
      throw error;
    }
  },

  async getUserByEmail(email: string) {
    try {
      const db = await sqliteConnection();

      const querySQL = "SELECT * FROM users WHERE email == ?";
      const user = await db.get(querySQL, [email]);

      return user;
    } catch (error) {
      throw error;
    }
  },
};

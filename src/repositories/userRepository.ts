import { sqliteConnection } from "../databases/sqlite3";

export type UserDataCreate = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export const userRepository = {
  async createUser({ id, name, email, password }: UserDataCreate) {
    try {
      const db = await sqliteConnection();

      const querySQL =
        "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)";

      await db.run(querySQL, [id, name, email, password]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  async getUserByID(id: string) {
    try {
      const db = await sqliteConnection();

      const userQuerySQL = "SELECT * FROM users WHERE id == ?";
      const userData = await db.get(userQuerySQL, [id]);

      const tasksQuerySQL = "SELECT * FROM tasks WHERE user_id == ?";
      const tasks = await db.all(tasksQuerySQL, [id]);

      const tasksWithoutUserID = tasks.map((task) => {
        delete task.user_id;
        return task;
      });

      delete userData.password;

      userData.tasks = tasksWithoutUserID;
      return userData;
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

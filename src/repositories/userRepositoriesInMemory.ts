import { CreateUserDataType } from "./userRepository";

const users = [
  {
    id: "1",
    name: "user1",
    email: "user1@email.com",
    password: "qweQWE123!@#",
  },

  {
    id: "2",
    name: "user2",
    email: "user2@email.com",
    password: "qweQWE123!@#",
  },
];

export const userRepositoriesInMemory = {
  async createUser(data: CreateUserDataType) {
    try {
      const { id, name, email, password } = data;

      const user = {
        id,
        name,
        email,
        password,
      };

      users.push(user);

      return users[users.length - 1];
    } catch (error) {
      throw error;
    }
  },

  async getUserByID(id: string) {
    try {
      const user = users.find((user) => user.id == id);

      return user;
    } catch (error) {
      throw error;
    }
  },

  async getUserByEmail(email: string) {
    try {
      const user = users.find((user) => user.email == email);

      return user;
    } catch (error) {
      throw error;
    }
  },
};

import { randomUUID } from "node:crypto";
import { hash } from "bcrypt";
import { CreateUserDataType } from "../repositories/userRepository";
import { appError } from "../errors/appError";
import { UserDataTypes } from "../validations/userSchema";

export type UserRepositoryTypes = {
  createUser(data: CreateUserDataType): Promise<{} | undefined>;
  getUserByID(id: string): Promise<{ password?: string } | undefined>;
  getUserByEmail(email: string): Promise<{ id: string; password: string } | undefined>;
};

export const userServices = {
  async create(data: UserDataTypes, repository: UserRepositoryTypes) {
    try {
      const { name, email, password } = data;

      const user = await repository.getUserByEmail(email);

      if (user) throw appError("email already exists!", 400);

      const passwordHash = await hash(password, 10);

      const userData = {
        id: randomUUID(),
        name,
        email,
        password: passwordHash,
      };

      const userCreated = await repository.createUser(userData);

      return userCreated;
    } catch (error) {
      throw error;
    }
  },

  async read(id: string, repository: UserRepositoryTypes) {
    try {
      const userData = await repository.getUserByID(id);

      if (!userData) throw appError("user not found!", 404);

      delete userData.password;

      return userData;
    } catch (error) {
      throw error;
    }
  },
};

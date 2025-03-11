import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../errors/appError";
import { LoginDataTypes } from "../validations/loginSchema";
import { UserRepositoryTypes } from "./userServices";

export const authServices = {
  async login(data: LoginDataTypes, repository: UserRepositoryTypes) {
    try {
      const { email, password } = data;

      const user = await repository.getUserByEmail(email);
      if (!user) throw new AppError("email or password invalid!", 401);

      const passwordCheck = await compare(password, user.password);
      if (!passwordCheck) throw new AppError("email or password invalid!", 401);

      const token = sign({ id: user.id }, process.env.SECRET_TOKEN, {
        expiresIn: process.env.EXPIRESIN_TOKEN,
      });

      return { id: user.id, token };
    } catch (error) {
      throw error;
    }
  },
};

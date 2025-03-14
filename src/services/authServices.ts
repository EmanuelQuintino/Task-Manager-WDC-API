import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../errors/appError";
import { AuthDataTypes } from "../validations/authSchema";
import { UserRepositoryTypes } from "./userServices";

export const authServices = {
  async login({ email, password }: AuthDataTypes, repository: UserRepositoryTypes) {
    try {
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

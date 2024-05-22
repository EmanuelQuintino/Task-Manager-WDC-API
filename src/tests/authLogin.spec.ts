import { describe, it, expect } from "vitest";
import { userRepositoriesInMemory } from "../repositories/userRepositoriesInMemory";
import { authServices } from "../services/authServices";
import "dotenv/config";

describe("test authentication login functions", async () => {
  const user = {
    email: "user1@email.com",
    password: "1234567",
  };

  it("should user log in", async () => {
    const login = await authServices.login(user, userRepositoriesInMemory);
    expect(login).toHaveProperty("token");
  });

  it("should not log in user with invalid email", async () => {
    try {
      await authServices.login(
        { ...user, email: "invalid@email.com" },
        userRepositoriesInMemory
      );
    } catch (error: any) {
      expect(error.message).toBe("email or password invalid!");
    }
  });

  it("should not log in user with invalid password", async () => {
    try {
      await authServices.login(
        { ...user, password: "invalid" },
        userRepositoriesInMemory
      );
    } catch (error: any) {
      expect(error.message).toBe("email or password invalid!");
    }
  });
});

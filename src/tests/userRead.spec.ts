import { describe, it, expect } from "vitest";
import { userRepositoryInMemory } from "../repositories/userRepositoryInMemory";
import { userServices } from "../services/userServices";

describe("test read user functions", async () => {
  it("should read a user by ID and not have a password", async () => {
    const user = await userServices.read("1", userRepositoryInMemory);
    expect(user).toHaveProperty("id");
    expect(user).not.toHaveProperty("password");
  });

  it("should not found user", async () => {
    try {
      await userServices.read("userID", userRepositoryInMemory);
    } catch (error: any) {
      expect(error.message).toBe("user not found!");
    }
  });
});

import { describe, it, expect } from "vitest";
import { userRepositoriesInMemory } from "../repositories/userRepositoriesInMemory";
import { userServices } from "./userServices";
import { randomUUID } from "node:crypto";

describe("test user services functions", async () => {
  const user = {
    id: randomUUID(),
    name: "Emanuel Quintino",
    email: "emanuelquintino@hotmail.com",
    password: "1234567",
  };

  it("should create a user", async () => {
    const createUser = await userServices.create(user, userRepositoriesInMemory);
    expect(createUser).toHaveProperty("id");
  });

  it("should not create user if email is repeated", async () => {
    try {
      await userServices.create(user, userRepositoriesInMemory);
    } catch (error: any) {
      expect(error.message).toBe("email already exists!");
    }
  });
});

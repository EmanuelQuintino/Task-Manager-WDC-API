import { z } from "zod";

export const userUUIDSchema = z
  .object({
    id: z
      .string({
        required_error: "user ID is required!",
        invalid_type_error: "user ID must be a string!",
      })
      .uuid({ message: "invalid user ID!" }),
  })
  .strict();

export type userUUIDTypes = z.infer<typeof userUUIDSchema>;

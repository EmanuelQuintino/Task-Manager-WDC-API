import { z } from "zod";

export const taskUUIDSchema = z.object({
  id: z
    .string({
      required_error: "task ID is required!",
      invalid_type_error: "task ID must be a string!",
    })
    .uuid({ message: "invalid task ID!" }),
});

export type taskUUIDTypes = z.infer<typeof taskUUIDSchema>;

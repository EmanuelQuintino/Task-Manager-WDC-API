import { z } from "zod";

export const paginationSchema = z
  .object({
    limit: z
      .string({
        required_error: "limit is required!",
        invalid_type_error: "limit must be a string!",
      })
      .max(255, "max limit length exceeded!")
      .regex(/^\d+$/, "limit must have only numbers!"),

    offset: z
      .string({
        required_error: "offset is required!",
        invalid_type_error: "offset must be a string!",
      })
      .max(255, "max offset length exceeded!")
      .regex(/^\d+$/, "offset must have only numbers!"),
  })
  .strict();

export type PaginationDataTypes = z.infer<typeof paginationSchema>;

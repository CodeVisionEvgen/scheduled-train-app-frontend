import { z } from "zod";

export const signupSchema = z
  .object({
    email: z
      .string()
      .min(6, "Email must be at least 6 characters long")
      .max(80, "Email must be at most 80 characters long")
      .email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(30, "Password must be at most 30 characters long"),
    repeatedPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatedPassword, {
    message: "Passwords do not match",
    path: ["repeatedPassword"],
  });

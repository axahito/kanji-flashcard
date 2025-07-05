import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
        message: "Password must contain at least 1 number and 1 symbol",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;

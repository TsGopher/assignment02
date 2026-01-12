import { z } from "zod";

export enum ROLE {
  ADMIN = "admin",
  CUSTOMER = "customer",
}

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z
    .string()
    .email("Invalid email format")
    .transform((val) => val.toLowerCase()),

  password: z.string().min(6, "Password must be at least 6 characters"),

  phone: z.string().min(6, "Phone number is required"),

  role: z.nativeEnum(ROLE),
});

export type TSignupPayload = z.infer<typeof signupSchema>;

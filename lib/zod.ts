import { object, string } from "zod"
 
export const signInSchema = object({
  Username: string({ required_error: "User is required" })
    .min(1, "User is required"),
  Password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

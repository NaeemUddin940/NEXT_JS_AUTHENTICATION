import { z } from "zod";

/* -------- Sign Up -------- */
export const signUpSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

/* -------- OTP Verify -------- */
export const otpVerifySchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, "OTP must be 6 digits"),
  resendCount: z
    .number()
    .int()
    .min(0)
    .max(3, "Please Wait 5 minitues. Then try again."),
});

/* -------- Sign In -------- */
export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

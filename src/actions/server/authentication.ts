"use server";

import { z } from "zod";

/* -------------------- Zod Schema -------------------- */

const authSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters").optional(),

  email: z.string().email("Invalid email address").optional(),

  phone: z.string().min(10, "Invalid phone number").optional(),

  password: z.string().min(6, "Password must be at least 6 characters"),

  otp: z.string().length(6, "Verification code must be 6 digits").optional(),
});

/* -------------------- Types -------------------- */

export type AuthFields = {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  otp?: string;
  authMethod?: "email" | "phone";
  isLogin?: "true" | "false";
  isOtpSent?: "true" | "false";
};

export type AuthState = {
  success: boolean;
  message?: string;
  errors: Record<string, string[]>;
  fields: Partial<AuthFields>;
};

/* -------------------- Server Action -------------------- */

export async function authenticate(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  /* Convert FormData → Object */
  const data = Object.fromEntries(formData.entries()) as AuthFields;

  console.log(data);

  const { authMethod, isLogin, isOtpSent } = data;

  /* Fake network delay */
  await new Promise((res) => setTimeout(res, 1000));

  /* -------------------- Dynamic Schema -------------------- */

  const schemaShape: Partial<
    Record<keyof typeof authSchema.shape, z.ZodTypeAny>
  > = {
    password: authSchema.shape.password,
  };

  if (isOtpSent === "true") {
    schemaShape.otp = authSchema.shape.otp;
  } else {
    if (isLogin !== "true") {
      schemaShape.fullName = authSchema.shape.fullName;
    }

    if (authMethod === "email") {
      schemaShape.email = authSchema.shape.email;
    } else {
      schemaShape.phone = authSchema.shape.phone;
    }
  }

  const currentSchema = z.object(schemaShape);

  const validation = currentSchema.safeParse(data);

  /* -------------------- Validation Error -------------------- */

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      message: "Check your inputs.",
      fields: data,
    };
  }

  console.log("validated:", validation.data);

  /* -------------------- Registration Step (Send OTP) -------------------- */

  if (isOtpSent !== "true" && isLogin !== "true") {
    return {
      success: true,
      message: "OTP_SENT",
      errors: {},
      fields: {},
    };
  }

  /* -------------------- Final Success -------------------- */

  return {
    success: true,
    message: isOtpSent === "true" ? "REGISTRATION_COMPLETE" : "LOGGED_IN",
    errors: {},
    fields: {},
  };
}

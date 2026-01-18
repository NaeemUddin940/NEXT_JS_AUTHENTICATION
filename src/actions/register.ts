"use server";

import { z } from "zod";

const authSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters").optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().min(10, "Invalid phone number").optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  otp: z.string().length(6, "Verification code must be 6 digits").optional(),
});

/**
 * Server Action to handle Authentication
 */
export async function authenticate(prevState, formData) {
  const data = Object.fromEntries(formData.entries());

  const { authMethod, isLogin, isOtpSent } = data;

  // Simulate network delay
  await new Promise((res) => setTimeout(res, 1000));

  // Build dynamic schema based on form state
  const schemaShape = {
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

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      message: "Check your inputs.",
      fields: data,
    };
  }

  console.log(validation.data);

  // Logic for registration flow
  if (isOtpSent !== "true" && isLogin !== "true") {
    return {
      success: true,
      message: "OTP_SENT",
      errors: {},
      fields: {},
    };
  }

  // Final success state
  return {
    success: true,
    message: isOtpSent === "true" ? "REGISTRATION_COMPLETE" : "LOGGED_IN",
    errors: {},
    fields: {},
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { z } from "zod";

// State er type define kora
export type FormState = {
  success: boolean;
  message: string;
  errors: Record<string, string[] | undefined>;
  fields: Record<string, any>; // Form input persistence er jonno
};

const registerSchema = z.object({
  name: z.string().min(3, "Name must be 3+ characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be 6+ characters"),
});

export async function handleRegister(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validatedFields = registerSchema.safeParse({ name, email, password });

  // Jodi validation fail kore
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
      fields: { name, email }, // Password persistence dorkar nei security-r jonno
    };
  }

  // Success logic (Database save etc.)
  try {
    console.log("Saving:", validatedFields.data);
    return {
      success: true,
      message: "Registration successful!",
      errors: {},
      fields: {},
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Database error.",
      errors: {},
      fields: { name, email },
    };
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth } from "@/lib/auth";

import { env } from "@/lib/env";

import generateOTP from "@/utils/generate-otp";

import sendEmail from "@/utils/send-email";

import { z } from "zod";

import { AuthError } from "@/constants/ErrorMessage";
import { AuthSuccess } from "@/constants/SuccessMessage";
import { VerifyOtpTemplate } from "../../../Template/verify-otp-template";

/* -------------------- Zod Schema -------------------- */

const authSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters").optional(),

  email: z.string().email("Invalid email address").optional(),

  phone: z.string().min(10, "Invalid phone number").optional(),

  password: z.string().min(8, "Password must be at least 8 characters"),

  otp: z.string().length(6, "Verification code must be 6 digits").optional(),
});

/* -------------------- Server Action -------------------- */

export async function authenticate(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const data = Object.fromEntries(formData.entries()) as AuthFields;
  const isLoginMode = data.isLogin === "true";
  const isOtpStep = data.isOtpSent === "true";
  const authMethod = data.authMethod;

  /* -------------------- Dynamic Schema -------------------- */
  const schemaShape: any = {
    password: authSchema.shape.password,
  };

  if (isOtpStep) {
    schemaShape.otp = authSchema.shape.otp;
    // OTP ভেরিফিকেশনের সময় ইমেইলটাও লাগে Better-Auth এ
    schemaShape.email = authSchema.shape.email;
  } else {
    if (!isLoginMode) schemaShape.fullName = authSchema.shape.fullName;
    if (authMethod === "email") schemaShape.email = authSchema.shape.email;
    else schemaShape.phone = authSchema.shape.phone;
  }

  const currentSchema = z.object(schemaShape);
  const validation = currentSchema.safeParse(data);
  const validatedData = validation.data as any;

  try {
    /* -------------------- STEP 1: Registration & Send OTP -------------------- */
    if (!isLoginMode && !isOtpStep) {
      const res = await auth.api.signUpEmail({
        body: {
          name: validatedData.fullName,
          email: validatedData.email,
          password: validatedData.password,
        },
      });

      if (res) {
        const otp = generateOTP();
        // নোট: ওটিপিটি ডাটাবেসে বা সেশনে সেভ করতে হবে ভেরিফাই করার জন্য।
        // যদি Better-Auth এর ইমেইল ভেরিফিকেশন প্লাগইন ইউজ করেন তবে এটি অটো হয়।

        const isSendEmail = await sendEmail(
          validatedData.email,
          "Verify Your Email!",
          VerifyOtpTemplate("Track O Data", env.COMPANY_EMAIL, otp),
        );

        if (isSendEmail) {
          return {
            success: true,
            message: AuthSuccess.registerdAndOtpSent.message,
            errors: {},
            fields: data, // fields: data রাখলে OTP স্ক্রিনে ইমেইল হিডেনলি থাকবে
          };
        }
      }
    }

    /* -------------------- STEP 2: OTP Verification -------------------- */
    if (!isLoginMode && isOtpStep) {
      // এখানে আপনার OTP ভেরিফিকেশন লজিক (Better-Auth এর verifyEmail বা আপনার কাস্টম লজিক)
      // উদাহরণ:
      /* await auth.api.verifyEmail({ body: { email: validatedData.email, code: validatedData.otp } }); */

      return {
        success: true,
        message: "REGISTRATION_COMPLETE",
        errors: {},
        fields: {}, // Success এ ফিল্ডস ফাকা করে দিন
      };
    }

    /* -------------------- STEP 3: Login -------------------- */
    if (isLoginMode) {
      await auth.api.signInEmail({
        body: {
          email: validatedData.email,
          password: validatedData.password,
        },
      });

      return {
        success: true,
        message: "LOGGED_IN",
        errors: {},
        fields: {},
      };
    }
  } catch (error: any) {
    // Better-Auth এর APIError চেক করা
    if (
      error.status === "UNPROCESSABLE_ENTITY" ||
      error.message.includes("already exists")
    ) {
      return {
        success: false,
        errors: {},
        message: AuthError.alreadyExist.message,
        fields: data,
      };
    }
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors as any,
      message: AuthError.registrationFailed.message,
      fields: data,
    };
  }

  return {
    success: false,
    message: "Invalid Request",
    errors: {},
    fields: data,
  };
}

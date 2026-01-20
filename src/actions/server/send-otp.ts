"use server";

import { AuthError, Otp_Error } from "@/constants/ErrorMessage";
import { AuthSuccess } from "@/constants/SuccessMessage";
import connectDB, { db } from "@/lib/mongodb";
import { signUpSchema } from "@/lib/zod/zod-auth-schema";
import { OTP } from "@/models/OTP";

import { env } from "@/lib/env";
import generateOTP from "@/utils/generate-otp";
import sendEmail from "@/utils/send-email";
import { VerifyOtpTemplate } from "../../../Template/verify-otp-template";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function sendOtpToEmail(prevState: any, formData: FormData) {
  await connectDB();

  const rawData = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = signUpSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const data = result.data;

  // 1. User check
  const existingUser = await db
    .collection("user")
    .findOne({ email: data.email });

  if (existingUser) {
    return {
      success: false,
      message: AuthError.Already_Exist.message,
      fields: {},
    };
  }

  // 2. OTP Logic
  const generatedOtp = generateOTP();
  const otpAsNumber = parseInt(generatedOtp);

  const record = await OTP.findOne({ email: data.email });
  let newRecord;
  if (!record) {
    // Prothom barer jonno create
   newRecord= await OTP.create({
      email: data.email,
      otp: otpAsNumber,
      expireAt: new Date(Date.now() + 5 * 60 * 1000),
      resendCount: 0, // Prothom bar pathale 0 thakbe
    });
  } else {
    // Ekhane count increment korte hobe ebong OTP update korte hobe
    await OTP.updateOne(
      { email: data.email },
      {
        $set: {
          otp: otpAsNumber,
          expireAt: new Date(Date.now() + 5 * 60 * 1000),
        }, // Notun OTP set kora
        $inc: { resendCount: 1 }, // Count 1 barano
      },
    );
  }
  // 3. Send Email (Uncomment this part in production)

  const isSendEmail = await sendEmail(
    data.email,
    "Verify Your Email",
    VerifyOtpTemplate({
      companyName: "Track O Data",
      companyEmail: env.COMPANY_EMAIL,
      otp: otpAsNumber,
    }),
  );

  if (!isSendEmail) {
    return {
      success: false,
      message: Otp_Error.Otp_Sent_Failed.message,
      errors: {},
    };
  }

  return {
    success: true,
    extra: { sentOtp: true, expireAt: newRecord?.expireAt },
    message: AuthSuccess.Otp_Sent.message,
    errors: {},
    fields: {
      email: data.email,
      fullName: data.fullName,
      password: data.password,
    },
  };
}

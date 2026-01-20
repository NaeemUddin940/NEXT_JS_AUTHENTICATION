"use server";

import { Otp_Error } from "@/constants/ErrorMessage";
import { AuthSuccess } from "@/constants/SuccessMessage";
import { env } from "@/lib/env";
import connectDB from "@/lib/mongodb";
import { OTP } from "@/models/OTP";
import generateOTP from "@/utils/generate-otp";
import sendEmail from "@/utils/send-email";
import { VerifyOtpTemplate } from "../../../Template/verify-otp-template";

export const resendOtp = async ({ email }) => {
  try {
    await connectDB();
    const otp = generateOTP();
    const otpAsNumber = parseInt(otp);

    // ১. ইউজার ডাটাবেজে আছে কি না চেক করুন
    const record = await OTP.findOne({ email });

    if (record) {
      const currentTime = new Date();
      const lastUpdated = new Date(record.updatedAt);
      const timeDifference = (currentTime - lastUpdated) / 1000; // Second-e convert

      if (timeDifference < 60) {
        // Jodi 1 minute-er kom hoy
        return {
          success: false,
          message: "Please wait 1 minute before resending.",
        };
      }

      // ২. Resend limit check
      if (record.resendCount >= 3) {
        return {
          success: false,
          message: "Resend Limit Exceeded. Please try after some time.",
        };
      }

      await OTP.findOneAndUpdate(
        { email },
        {
          $set: {
            otpAsNumber,
            expireAt: new Date(), // বর্তমান সময় দিলেই স্কিমার ৩০০০ সেকেন্ড (৫ মিনিট) কাজ করবে
          },
          $inc: { resendCount: 1 },
        },
        { new: true, runValidators: true },
      );
    } else {
      console.log(email)
      await OTP.create({
        email,
        otp: otpAsNumber,
        resendCount: 0,
        expireAt: new Date(),
      });
    }

    // ২. লিমিট চেক (৩ বার অলরেডি রিসেন্ড হয়ে গেলে আর এলাও করবে না)

    // ৩. নতুন OTP তৈরি করুন

    // ৪. ইমেইল পাঠান
    const isSendEmail = await sendEmail(
      email,
      "Verify Your Email",
      VerifyOtpTemplate({
        companyName: "Track O Data",
        companyEmail: env.COMPANY_EMAIL,
        otpAsNumber,
      }),
    );

    if (!isSendEmail) {
      return {
        success: false,
        message: Otp_Error.Otp_Sent_Failed.message,
      };
    }

    // ৫. ডাটাবেজ আপডেট করুন
    // $inc ব্যবহার করার সময় Schema-র max: 3 ভ্যালিডেশন অনেক সময় ঝামেলা করে,
    // তাই try-catch এর ভেতর রাখা নিরাপদ।

    return {
      success: true,
      message: AuthSuccess.Otp_Sent.message,
    };
  } catch (error) {
    console.error("Resend OTP Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};

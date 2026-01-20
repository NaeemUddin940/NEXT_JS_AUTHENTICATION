"use server";

import { Otp_Error } from "@/constants/ErrorMessage";
import { AuthSuccess } from "@/constants/SuccessMessage";
import { auth } from "@/lib/auth";
import connectDB, { User } from "@/lib/mongodb"; // নিশ্চিত করুন DB কানেকশন আছে
import { OTP } from "@/models/OTP";

export async function verifyOtpAndRegister(registrationData, otp) {
  try {
    console.log(registrationData);
    await connectDB();
    const otpAsNumber = parseInt(otp);

    if (!otpAsNumber) {
      return {
        success: false,
        message: Otp_Error.Otp_Required.message,
        fields: registrationData,
      };
    }

    if (typeof otpAsNumber === "string") {
      return {
        success: false,
        message: Otp_Error.Otp_Invalid.message,
        fields: registrationData,
      };
    }

    if (otpAsNumber.toString().length < 6) {
      return {
        success: false,
        message: Otp_Error.Otp_Length.message,
        fields: registrationData,
      };
    }

    // ১. ইমেইল দিয়ে ডাটাবেস থেকে OTP খুঁজে বের করা
    const savedOtpRecord = await OTP.findOne({ email: registrationData.email });

    // ২. ওটিপি পাওয়া না গেলে বা মেয়াদ শেষ হলে
    if (!savedOtpRecord) {
      return {
        success: false,
        message: Otp_Error.Otp_Expired.message,
        errors: {},
        fields: registrationData, // ইমেইল ফিরিয়ে দেয়া যাতে ইউজার আবার ট্রাই করতে পারে
      };
    }

    // ৩. ইনপুট ওটিপি স্ট্রিং নাকি নাম্বার তা চেক করে ক্লিন করা

    // ৪. ওটিপি ম্যাচিং চেক
    if (savedOtpRecord.otp !== otpAsNumber) {
      return {
        success: false,
        message: Otp_Error.Otp_Incorrect.message,
        errors: {},
        fields: registrationData,
      };
    }

    if (savedOtpRecord.expireAt < Date.now()) {
      return {
        success: false,
        message: Otp_Error.Otp_Expired.message,
        errors: {},
        fields: registrationData, // ইমেইল ফিরিয়ে দেয়া যাতে ইউজার আবার ট্রাই করতে পারে
      };
    }

    // ৫. ওটিপি সঠিক হলে ডাটাবেস থেকে রেকর্ডটি মুছে ফেলা (যাতে পুনরায় ব্যবহার না হয়)

    /* ---------------- ৬. ইউজার তৈরির লজিক (Create User) ---------------- */
    await auth.api.signUpEmail({
      body: {
        name: registrationData.fullName,
        email: registrationData.email,
        password: registrationData.password, // মনে করে পাসওয়ার্ড হ্যাশ করবেন
      },
    });

    await User.findOneAndUpdate(
      { email: registrationData.email },
      {
        $set: { emailVerified: true }, // Use the $set atomic operator
      },
      { new: true }, // Optional: returns the updated document instead of the old one
    );

    return {
      success: true,
      message: AuthSuccess.Registerd_Success.message,
      errors: {},
      fields: { isLogin: true },
    };
  } catch (error) {
    console.error("Verification Error:", error);
    return {
      success: false,
      message: error.message,
      errors: {},
      fields: registrationData,
    };
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendOtpToEmail } from "./send-otp";
import { verifyOtpAndRegister } from "./verify-otp-and-register";

// authenticate.ts (মেইন সার্ভার অ্যাকশন)
export async function authenticate(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const isOtpSent = formData.get("isOtpSent") === "true";
  const email = formData.get("email") as string;
  const fullName = formData.get("fullName") as string;
  const password = formData.get("password") as string;
  const otp = formData.get("otp") as string;

  // ২. প্রথম ধাপ: ওটিপি পাঠানো
  if (!isOtpSent) {
    const response = await sendOtpToEmail(prevState, formData);

    // যদি এরর হয়, তবে আগের ডেটাগুলো ফেরত পাঠান যাতে ইনপুট ফিল্ড ফাঁকা না হয়
    if (!response.success) {
      return {
        ...response,
        fields: { email, fullName, password }, // ডেটা ধরে রাখা
      };
    }
    return response;
  }

  // ৩. দ্বিতীয় ধাপ: ওটিপি ভেরিফাই ও রেজিস্ট্রেশন
  // এখানে অতিরিক্ত চেক রাখুন যাতে ডেটা মিসিং থাকলে ক্রাশ না করে
  if (!email) {
    return {
      success: false,
      message: "Missing email or OTP. Please try again.",
      extra: { sentOtp: true }, // ওটিপি ইনপুট ফিল্ডটি দেখানোর জন্য
      fields: { email, fullName, password },
    };
  }

  const registrationData = { email, fullName, password };

  return await verifyOtpAndRegister(registrationData, otp);
}

export const AuthError = {
  /* ------------------------- 1. Name Validation ------------------------- */

  Already_Exist: {
    success: false,
    message: "🚫 This information cannot be used. Please try another or login.",
    status: 409,
  },
  notVerified: {
    success: false,
    message:
      "🔒 Your account is not verified yet. Please verify your email first.",
    status: 401,
  },

  invalidCredentials: {
    success: false,
    message: "✨ Oops! We couldn't find a match for those credentials.",
    status: 401,
  },

  /* ------------------------- 2. Email Validation ------------------------- */
  emailOrPhoneRequired: {
    success: false,
    message: "👋 Oops! We need your email or phone number.",
    status: 400,
  },
  emailRequired: {
    success: false,
    message: "👋 Oops! We need your email.",
    status: 400,
  },
  emailAlreadyVerified: {
    success: false,
    message: "✅ Email already verified. Please login.",
    status: 400,
  },
  invalidEmail: {
    success: false,
    message: "📧 Please provide a valid email address.",
    status: 400,
  },

  /* ------------------------- 3. Phone Validation ------------------------- */
  invalidPhone: {
    success: false,
    message: "📞 Phone number must be between 10 to 15 digits.",
    status: 400,
  },

  /* ------------------------- 4. Password Validation ------------------------- */
  passwordRequired: {
    success: false,
    message: "🔑 Password is required.",
    status: 401,
  },
  passwordLength: {
    success: false,
    message: "🔐 Password must be at least 8 characters long.",
    status: 401,
  },
  passwordTooWeak: {
    success: false,
    message:
      "🛡️ Password should include a mix of letters, numbers, and symbols.",
    status: 401,
  },

  /* ------------------------- 5. OTP (One-Time Password) ------------------------- */

  registrationFailed: {
    success: false,
    message:
      "🚫 Registration failed. Please check your information and try again.",
    status: 400,
  },

  /* ------------------------- 6. Security & Authorization ------------------------- */
  unauthorized: {
    success: false,
    message: "🔐 Invalid credentials. Please try again.",
    status: 401,
  },
  accessDenied: {
    success: false,
    message: "🛡️ Access denied due to security reasons.",
    status: 403,
  },
  accountBlocked: {
    success: false,
    message: "🚫 Account disabled. Contact support.",
    status: 403,
  },
  invalidRole: {
    success: false,
    message: "🛡️ Invalid role! Must be admin, manager, or user.",
    status: 400,
  },
  invalidSocialProvider: {
    success: false,
    message: "🌐 Invalid social provider selected.",
    status: 400,
  },

  /* ------------------------- 7. General System Errors ------------------------- */
  notFound: {
    success: false,
    message: "🚫 The requested information could not be found.",
    status: 404,
  },
  serverError: {
    success: false,
    message: "⚙️ Something went wrong on our end. Please try again later.",
    status: 500,
  },
};

export const Otp_Error = {
  Otp_Required: {
    success: false,
    message: "🔢 OTP is Required.",
    status: 400,
  },
  Otp_Length: {
    success: false,
    message: "🔢 OTP must be 6 digits.",
    status: 400,
  },
  Otp_Invalid: {
    success: false,
    message: "🚫 OTP must contain only digits.",
    status: 400,
  },
  Otp_Sent_Failed: {
    success: false,
    message: "❌ Failed to send OTP to your email. Please try again.",
    status: 500,
  },
  Otp_Expired: {
    success: false,
    message: "⌛ OTP has expired. Please request a new one.",
    status: 410,
  },
  Otp_Incorrect: {
    success: false,
    message: "❌ The OTP you entered is incorrect. Please check and try again.",
    status: 401,
  },
};

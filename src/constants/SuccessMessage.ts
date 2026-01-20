export const AuthSuccess = {
  /* ------------------------- 1. Account Actions ------------------------- */
  Registerd_Success: {
    success: true,
    message: "🎉 Registered successfully! Please Login and access all features!",
    status: 201,
  },
  Login_Success: {
    success: true,
    message: "🔓 Login successful. Welcome back!",
    status: 200,
  },
  Logout_Success: {
    success: true,
    message: "👋 Logged out successfully. See you soon!",
    status: 200,
  },

  /* ------------------------- 2. OTP & Verification ------------------------- */
  Otp_Verified: {
    success: true,
    message: "✅ OTP verified successfully.",
    status: 200,
  },
  Otp_Sent: {
    success: true,
    message: "📨 OTP sent to your email successfully.",
    status: 200,
  },
  Email_Verified: {
    success: true,
    message: "📧 Email verified successfully! You can now access all features.",
    status: 200,
  },

  /* ------------------------- 3. Password Management ------------------------- */
  passwordResetLinkSent: {
    success: true,
    message: "🔗 Password reset link has been sent to your email.",
    status: 200,
  },
  Password_Changed: {
    success: true,
    message:
      "🔑 Password changed successfully. Please login with your new password.",
    status: 200,
  },
};

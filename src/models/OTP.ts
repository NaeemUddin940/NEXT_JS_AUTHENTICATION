import { Schema, model, models } from "mongoose";

const OTPSchema = new Schema(
  {
    email: { type: String, required: true, index: true },
    otp: { type: Number, required: true },
    resendCount: {
      type: Number,
      default: 0, // Default 0 thakbe
      max: 3,
    },
    expireAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const OTP = models.OTP || model("OTP", OTPSchema);

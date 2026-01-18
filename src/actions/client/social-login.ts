"use client";
import { authClient } from "@/lib/auth-client";

export const handleSocialLogin = async (provider: "google" | "facebook") => {
  await authClient.signIn.social({
    provider,
    callbackURL: "/user/profile", // Where to go after success
  });
};

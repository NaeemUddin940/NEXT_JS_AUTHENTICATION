"use client";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const handleLogin = async (provider: "google" | "facebook") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/user/profile", // Where to go after success
    });
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <button
        onClick={() => handleLogin("google")}
        className="px-4 py-2 bg-white text-black border rounded"
      >
        Login with Google
      </button>

      <button
        onClick={() => handleLogin("facebook")}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Login with Facebook
      </button>
    </div>
  );
}

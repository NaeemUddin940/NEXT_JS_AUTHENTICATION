/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { authenticate } from "@/actions/authentication";
import { Lock, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import InputField from "./common/InputField";
import { OTPInput } from "./common/OTPinput";
import { Button } from "./ui/button";

const AuthPage = () => {
  const [state, formAction, isPending] = useActionState(authenticate, {
    success: false,
    errors: {},
    message: "",
    fields: {}, // Server theke asha typed data
  });

  const [myOtp, setMyOtp] = useState("");

  const [isLogin, setIsLogin] = useState(false);
  const [authMethod, setAuthMethod] = useState("email"); // 'email' or 'phone'
  const [isOtpSent, setIsOtpSent] = useState(false);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setIsOtpSent(false); // Reset OTP state when switching modes
  };

  const handleMethodChange = (method: string) => {
    setAuthMethod(method);
    setIsOtpSent(false);
  };

  // AuthPage component er bhetor code-ti add korun
  useEffect(() => {
    if (state.success && state.message === "OTP_SENT") {
      setIsOtpSent(true);
    }

    if (state.success && state.message === "REGISTRATION_COMPLETE") {
      // Registration hoye gele user ke redirect korte paren ba success message dekhate paren
      console.log("object");
    }
  }, [state]);

  return (
    <div className="min-h-screen bg-background gap-20 text-foreground flex items-center justify-center p-4 antialiased transition-colors duration-300">
      <div className="bg-card md:flex gap-20 p-5 lg:p-10 items-center rounded-2xl custom-shadow shadow-2xl border border-card-border">
        <div className="w-full hidden md:block max-w-125 mx-auto">
          <Image
            src="/Login.gif"
            alt="login"
            width={500}
            height={500}
            unoptimized={true}
            className="w-full h-auto"
          />
        </div>

        <div className="w-full max-w-137 bg-card border border-card-border rounded-2xl p-5 shadow-xl">
          {/* Header */}
          <div className="text-center mb-3">
            <h1 className="text-2xl font-bold text-primary mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-sm text-muted">
              {isOtpSent
                ? "Please enter the 6-digit code sent to your email"
                : isLogin
                  ? "Please enter your details to sign in"
                  : "Join us by filling out the information below"}
            </p>
          </div>

          {/* Auth Method Switcher (Only show if OTP not sent) */}
          {!isOtpSent && (
            <div className="flex p-1 bg-accent rounded-lg mb-4">
              <button
                onClick={() => handleMethodChange("email")}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  authMethod === "email"
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Email
              </button>
              <button
                onClick={() => handleMethodChange("phone")}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  authMethod === "phone"
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Phone
              </button>
            </div>
          )}

          {/* Form Content */}
          <form className="space-y-4" action={formAction}>
            <input type="hidden" name="authMethod" value={authMethod} />
            <input type="hidden" name="isLogin" value={String(isLogin)} />
            <input type="hidden" name="isOtpSent" value={String(isOtpSent)} />
            {!isOtpSent ? (
              <>
                {authMethod === "email" ? (
                  <>
                    {!isLogin && (
                      <div className="space-y-1.5">
                        <InputField
                          label="Full Name"
                          name="fullName"
                          type="text"
                          icon={<User size={20} />}
                          placeholder="MD. Naeem Uddin"
                          error={state.errors?.fullName}
                          defaultValue={state.fields?.fullName}
                        />
                      </div>
                    )}
                    <div className="space-y-1.5">
                      <InputField
                        label="Email Address"
                        name="email"
                        icon={<Mail size={20} />}
                        type="email"
                        placeholder="name@example.com"
                        error={state.errors?.email}
                        defaultValue={state.fields?.email}
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-1.5">
                    <InputField
                      label="Phone Number"
                      name="phone"
                      icon={<Phone size={20} />}
                      type="tel"
                      placeholder="+880 100-0000-000"
                      error={state.errors?.phone}
                      defaultValue={state.fields?.phone}
                    />
                  </div>
                )}
                <div className="space-y-1.5">
                  <InputField
                    label="Password"
                    name="password"
                    icon={<Lock size={20} />}
                    type="password"
                    placeholder="••••••••"
                    error={state.errors?.password}
                  />
                </div>

                <Button
                  variant="soft"
                  type="submit"
                  isLoading={isPending}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition-colors mt-2 shadow-lg shadow-primary/20"
                >
                  {isLogin
                    ? "Sign In"
                    : authMethod === "email"
                      ? "Verify & Register"
                      : "Register Now"}
                </Button>
              </>
            ) : (
              /* OTP Verification View (Sudhu Email Registration-er jonno) */
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium flex justify-between">
                    Email OTP Code
                    <button
                      onClick={() => setIsOtpSent(false)}
                      className="text-xs cursor-pointer text-primary hover:underline"
                    >
                      Edit Email
                    </button>
                  </label>
                  <OTPInput
                    name="otp"
                    value={myOtp}
                    onChange={(val) => setMyOtp(val)}
                  />
                </div>
                <button
                  // onClick={submitOTP}
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-primary/20"
                >
                  Complete Registration
                </button>
                <p className="text-center text-xs text-muted">
                  Didn&apos;t receive code?{" "}
                  <button
                    type="button"
                    className="text-primary cursor-pointer  hover:underline"
                  >
                    {/* <span className="flex">
                      {otpVerify.isPending ? (
                        <span className="flex items-center">
                          Resending
                          <span className="flex ml-0.5">
                            <span className="animate-[bounce_1s_infinite_0ms]">
                              .
                            </span>
                            <span className="animate-[bounce_1s_infinite_200ms]">
                              .
                            </span>
                            <span className="animate-[bounce_1s_infinite_400ms]">
                              .
                            </span>
                          </span>
                        </span>
                      ) : (
                        "Resend"
                      )}
                    </span> */}
                    Resend
                  </button>
                </p>
              </div>
            )}
          </form>

          {/* Social Buttons (Only show if OTP not sent) */}
          {!isOtpSent && (
            <>
              <div className="flex items-center my-4 text-muted text-[10px] uppercase tracking-[0.2em]">
                <div className="grow border-t border-input-border"></div>
                <span className="px-4">Or continue with</span>
                <div className="grow border-t border-input-border"></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  // যদি গুগল লোড হয় তবেই লোডার দেখাবে

                  image={{
                    src: "https://www.svgrepo.com/show/475656/google-color.svg",
                    alt: "Google",
                  }}
                >
                  Google
                </Button>

                <Button
                  // যদি ফেসবুক লোড হয় তবেই লোডার দেখাবে
                  //   isLoading={loadingProvider === "facebook"}
                  image={{
                    src: "https://www.svgrepo.com/show/475647/facebook-color.svg",
                    alt: "Facebook",
                  }}
                  //   onClick={async () => {
                  //     setLoadingProvider("facebook"); // ফেসবুকের জন্য লোডিং শুরু
                  //     try {
                  //       await handleSocialLogin("facebook");
                  //     } finally {
                  //       setLoadingProvider(null); // কাজ শেষ হলে রিসেট
                  //     }
                  //   }}
                >
                  Facebook
                </Button>
              </div>

              <p className="mt-5 text-center text-sm text-muted">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  onClick={toggleAuthMode}
                  className="text-primary font-semibold hover:underline"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

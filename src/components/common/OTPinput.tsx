/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useRef, useState } from "react";

interface OTPInputProps {
  name: string;
  length?: number;
  onChange?: (value: string) => void;
  value?: string;
}

export const OTPInput = ({
  name,
  length = 6,
  onChange,
  value: manualValue,
}: OTPInputProps) => {
  // ১. methods এবং useFormContext রিমুভ করা হয়েছে
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // বাইরে থেকে ভ্যালু আসলে সিঙ্ক করা
  useEffect(() => {
    if (manualValue) {
      const valArray = manualValue.split("").slice(0, length);
      setOtp([...valArray, ...new Array(length - valArray.length).fill("")]);
    }
  }, [manualValue, length]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    // শুধুমাত্র সংখ্যা অ্যালাউ করা
    if (!/^\d*$/.test(value)) return;

    const lastChar = value.substring(value.length - 1);
    const newOtp = [...otp];
    newOtp[index] = lastChar;

    setOtp(newOtp);

    // ২. লেটেস্ট ভ্যালু বের করা
    const combinedOtp = newOtp.join("");

    // ৩. শুধুমাত্র onChange ব্যবহার করা হয়েছে (যেহেতু Hook form নেই)
    if (onChange) {
      onChange(combinedOtp);
    }

    // ৪. পরের ইনপুট বক্সে ফোকাস করা
    if (lastChar && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // ৫. Paste সাপোর্ট
  const handlePaste = (e: React.ClipboardEvent) => {
    const data = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(data)) return;

    const pasteData = data.split("");
    const nextOtp = [...otp];
    pasteData.forEach((char, i) => {
      nextOtp[i] = char;
    });
    setOtp(nextOtp);

    const combined = nextOtp.join("");
    if (onChange) onChange(combined);

    inputRefs.current[Math.min(data.length, length - 1)]?.focus();
  };

  return (
    <div className="flex gap-2 justify-between">
      {/* একটি হিডেন ইনপুট রাখা ভালো যদি আপনি নেটিভ ফর্ম সাবমিশন ব্যবহার করেন */}
      <input type="hidden" name={name} value={otp.join("")} />

      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          value={data}
          onPaste={handlePaste}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 text-center text-xl font-bold border-2 border-input-border rounded-lg bg-input text-foreground focus:border-primary outline-none transition-all"
        />
      ))}
    </div>
  );
};

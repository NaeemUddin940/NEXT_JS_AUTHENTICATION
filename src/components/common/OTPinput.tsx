/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { ConfirmModal } from "./ConformModel";
import { Modal, ModalContent, ModalTrigger } from "./Model";

interface OTPInputProps {
  name: string;
  length?: number;
  onChange?: (value: string) => void;
  onEditEmail?: () => void;
  value?: string;
  error?: string | string[];
  label?: string;
}

export const OTPInput = ({
  name,
  length = 6,
  onChange,
  onEditEmail,
  value: manualValue,
  error,
  label = "Email OTP Code",
}: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const errorMessage = Array.isArray(error) ? error[0] : error;

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
    if (!/^\d*$/.test(value)) return;
    const lastChar = value.substring(value.length - 1);
    const newOtp = [...otp];
    newOtp[index] = lastChar;
    setOtp(newOtp);
    const combinedOtp = newOtp.join("");
    if (onChange) onChange(combinedOtp);
    if (lastChar && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").trim().slice(0, length);
    if (!/^\d+$/.test(data)) return;
    const pasteData = data.split("");
    const nextOtp = [...otp];
    pasteData.forEach((char, i) => {
      if (i < length) nextOtp[i] = char;
    });
    setOtp(nextOtp);
    const combined = nextOtp.join("");
    if (onChange) onChange(combined);
    const nextFocusIndex = Math.min(data.length, length - 1);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  return (
    <div className="flex flex-col gap-1.5 w-full relative">
      {/* Label & Edit Button */}
      <Modal>
        <div className="flex justify-between items-center w-full">
          <label className="text-sm font-semibold text-muted">{label}</label>
          {onEditEmail && (
            <ModalTrigger>
              <button
                type="button"
                className="text-xs cursor-pointer text-primary hover:text-primary-hover hover:underline font-medium transition-colors"
              >
                Edit Email
              </button>
            </ModalTrigger>
          )}
        </div>

        {/* OTP Inputs */}
        <div className="flex gap-2 justify-between">
          <input type="hidden" name={name} value={otp.join("")} />
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={data}
              onPaste={handlePaste}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg bg-input text-foreground focus:border-primary outline-none transition-all
              ${errorMessage ? "border-red-500" : "border-input-border"}`}
            />
          ))}
        </div>

        {errorMessage && (
          <span className="text-[12px] font-medium text-red-400 mt-0.5 ml-1">
            {errorMessage}
          </span>
        )}

        {/* --- কাস্টম কনফার্মেশন মডাল --- */}
        <ModalContent>
          <ConfirmModal
            title="Are you sure?"
            description="This action cannot be undone. It will permanently delete the data."
            onConfirm={onEditEmail}
            confirmText="Yes, Delete"
            onClose={() => {}} // এটি ModalContent থেকে অটোমেটিক ওভাররাইট হবে
          />
        </ModalContent>
      </Modal>
    </div>
  );
};

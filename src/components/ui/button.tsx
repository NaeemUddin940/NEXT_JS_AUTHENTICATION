"use client";

import Image from "next/image";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

// Button Props Interface
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?:
    | "primary"
    | "glow"
    | "glass"
    | "slide"
    | "gradient"
    | "soft"
    | "success"
    | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: ReactNode;
  image?: {
    src: string;
    alt: string;
  } | null;
  isFullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  isLoading = false,
  icon = null,
  image = null,
  isFullWidth = false,
  ...props
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center cursor-pointer rounded-xl font-bold transition-all duration-200 overflow-hidden focus:outline-none active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 group";

  const variants: Record<string, string> = {
    glow: "bg-primary text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_35px_rgba(79,70,229,0.6)] hover:-translate-y-1",
    glass:
      "bg-white/10 backdrop-blur-md border border-white/20 text-foreground hover:bg-white/20 hover:border-white/40 shadow-xl",
    slide:
      "bg-transparent border-2 border-primary text-primary hover:text-white before:content-[''] before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-primary before:-z-10 before:transition-all before:duration-500 hover:before:w-full z-10",
    gradient:
      "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white hover:hue-rotate-15 shadow-lg",
    soft: "bg-accent-bg text-foreground custom-shadow hover:shadow-inner",
    primary:
      "flex items-center justify-center gap-2 px-4 py-2.5 border border-input-border rounded-lg hover:bg-accent transition-all text-sm font-medium",
    success:
      "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30",
    danger:
      "bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/30",
  };

  const sizes: Record<string, string> = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-10 py-4 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        isFullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {/* Shine effect overlay */}
      <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></span>

      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <div className="flex items-center gap-2">
          {icon && (
            <span className="transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
              {icon}
            </span>
          )}
          {image && image.src && (
            <Image
              height={16}
              width={16}
              src={image.src}
              className="w-4 h-4 object-contain"
              alt={image.alt || "button icon"}
            />
          )}
          <span>{children}</span>
        </div>
      )}
    </button>
  );
};

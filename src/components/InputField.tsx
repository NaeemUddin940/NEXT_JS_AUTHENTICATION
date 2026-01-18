/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Eye, EyeOff } from "lucide-react";
import { ReactNode, useId, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Types                                   */
/* -------------------------------------------------------------------------- */

type IconType =
  | React.ComponentType<{ className?: string; strokeWidth?: number }>
  | ReactNode;

interface InputFieldProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  rows?: number;
  icon?: IconType;
  iconPosition?: "left" | "right";
  iconClassName?: string;
  required?: boolean;
  errors?: Record<string, string[] | undefined>; // Server side error (Zod)
  id?: string;
  defaultValue?: string | number;
  [key: string]: any;
}

/* -------------------------------------------------------------------------- */
/* Component                                 */
/* -------------------------------------------------------------------------- */

export default function InputField({
  name,
  label,
  type = "text",
  placeholder = "",
  className = "",
  containerClassName = "",
  rows = 4,
  icon: Icon,
  iconPosition = "left",
  iconClassName = "",
  required = false,
  errors,
  defaultValue,
  ...props
}: InputFieldProps) {
  const generatedId = useId();
  const inputId = props.id || generatedId;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isPassword = type === "password";
  const isTextarea = type === "textarea";

  // Server Side Action Errors Logic
  const fieldError = errors?.[name];

  /* ------------------------------ Styling --------------------------------- */

  // Apnar CSS variables ekhane apply kora hoyeche
  const baseClasses = `
    w-full px-4 py-2.5 rounded-lg transition-all duration-200 outline-none border
    bg-input text-foreground border-input-border
    placeholder:text-muted/50
    focus:ring-2 focus:ring-primary/10 focus:border-primary
    disabled:opacity-60 disabled:cursor-not-allowed
  `;

  const iconPaddingClasses = `
    ${Icon && iconPosition === "left" ? "pl-10" : ""}
    ${(Icon && iconPosition === "right") || isPassword ? "pr-10" : ""}
  `;

  // Error thakle border red-500 hobe, na thakle default input-border
  const errorClasses = fieldError
    ? "border-red-500 focus:ring-red-500/10 focus:border-red-500"
    : "";

  /* ------------------------------ Icon Render ------------------------------ */

  const renderIcon = (pos: "left" | "right") => {
    if (!Icon || iconPosition !== pos) return null;

    return (
      <div
        className={`absolute ${
          pos === "left" ? "left-3" : "right-3"
        } top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none transition-colors group-focus-within:text-primary`}
      >
        {typeof Icon === "function" ? (
          <Icon
            className={`h-5 w-5 text-muted ${iconClassName}`}
            strokeWidth={1.5}
          />
        ) : (
          Icon
        )}
      </div>
    );
  };

  /* -------------------------------------------------------------------------- */

  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-muted cursor-pointer w-fit"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative group">
        {renderIcon("left")}

        {isTextarea ? (
          <textarea
            id={inputId}
            name={name}
            rows={rows}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={`${baseClasses} ${errorClasses} resize-none ${className}`}
            {...(props as any)}
          />
        ) : (
          <input
            id={inputId}
            name={name}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={`${baseClasses} ${iconPaddingClasses} ${errorClasses} ${className}`}
            {...props}
          />
        )}

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground focus:text-primary transition-colors p-1"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {!isPassword && renderIcon("right")}
      </div>

      {fieldError && (
        <span
          role="alert"
          className="text-[12px] font-medium text-red-400 mt-0.5 ml-1 animate-in fade-in slide-in-from-top-1"
        >
          {fieldError[0]}
        </span>
      )}
    </div>
  );
}

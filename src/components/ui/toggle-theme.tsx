"use client";
// আপনার পাথ অনুযায়ী দিন
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./theme-provider";


export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme(); // Context থেকে ডেটা আসছে
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { id: "light", icon: Sun, label: "Light", color: "text-amber-500" },
    { id: "dark", icon: Moon, label: "Dark", color: "text-indigo-400" },
    { id: "system", icon: Monitor, label: "System", color: "text-emerald-500" },
  ] as const;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="h-10 w-10 flex items-center justify-center rounded-full transition-all duration-300 border border-card bg-card hover:shadow-lg">
        <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
          {/* আপনার আগের এনিমেশন লজিক হুবহু থাকবে */}
          <Sun
            className={`absolute transition-all duration-500 transform ${theme === "light" ? "translate-y-0 opacity-100 scale-100 text-amber-500" : "translate-y-8 opacity-0 scale-50"}`}
            size={20}
          />
          <Moon
            className={`absolute transition-all duration-500 transform ${theme === "dark" ? "translate-y-0 opacity-100 scale-100 text-indigo-400" : "translate-y-8 opacity-0 scale-50"}`}
            size={20}
          />
          <Monitor
            className={`absolute transition-all duration-500 transform ${theme === "system" ? "translate-y-0 opacity-100 scale-100 text-emerald-500" : "translate-y-8 opacity-0 scale-50"}`}
            size={20}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 top-full pt-2 z-50 transition-all duration-300 transform origin-top-right ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
      >
        <div className="bg-card border border-card-border shadow-2xl rounded-xl p-1.5 min-w-37.5">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setTheme(opt.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${theme === opt.id ? "bg-indigo-500/10 text-primary" : "text-muted hover:bg-muted/10"}`}
            >
              <div className="flex items-center gap-3">
                <opt.icon
                  size={16}
                  className={theme === opt.id ? opt.color : "opacity-50"}
                />
                <span>{opt.label}</span>
              </div>
              {theme === opt.id && <Check size={14} className="text-primary" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

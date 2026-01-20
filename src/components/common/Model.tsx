/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { createContext, useContext, useState } from "react";
import { Button } from "../ui/button";

// Context তৈরি (ইন্টারনাল স্টেট ম্যানেজ করার জন্য)
const ModalContext = createContext<{
  isOpen: boolean;
  open: () => void;
  close: () => void;
} | null>(null);

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

// ১. Trigger Component (যে বাটনে ক্লিক করলে ওপেন হবে)
export const ModalTrigger = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("ModalTrigger must be used within Modal");

  return React.cloneElement(children, {
    onClick: () => context.open(),
  });
};

// ২. Content Component (যেটা এনিমেট হয়ে আসবে)
export const ModalContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("ModalContent must be used within Modal");

  return (
    <AnimatePresence>
      {context.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={context.close}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              "relative z-50 w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl border dark:border-gray-800",
              className,
            )}
          >
            <div className="absolute cursor-pointer group right-4 top-4">
              <Button
                variant="cancel"
                size="sm"
                type="button"
                onClick={context.close}
                //   className=" p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
              >
                <X size={18} className="text-red-500 group-hover:text-white" />
              </Button>
            </div>

            {/* 🔥 গুরুত্বপূর্ণ পরিবর্তন এখানে: children-এর কাছে onClose পাস করা */}
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child as React.ReactElement<any>, {
                  onClose: context.close,
                });
              }
              return child;
            })}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

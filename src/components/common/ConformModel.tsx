"use client";

import { Button } from "../ui/button";

interface ConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal = ({
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Continue",
  cancelText = "Cancel",
}: ConfirmModalProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col space-y-2 text-center sm:text-left">
        {/* থিম ভেরিয়েবল ব্যবহার করা হয়েছে */}
        <h2 className="text-lg font-semibold text-foreground tracking-tight">
          {title}
        </h2>
        <p className="text-sm text-muted">{description}</p>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        <Button
          type="button"
          onClick={onClose}
          variant="danger"
          className="w-full sm:w-auto border-input-border text-foreground hover:bg-accent"
        >
          {cancelText}
        </Button>
        <Button
          type="button"
          variant="success"
        //   className="w-full sm:w-auto bg-primary  text-white transition-colors"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
};

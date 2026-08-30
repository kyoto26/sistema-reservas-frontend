"use client";

import { useId, useState, type InputHTMLAttributes } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "id"> & {
  id?: string;
  label: string;
};

export default function PasswordInput({ id, label, className, ...inputProps }: PasswordInputProps) {
  const { dict } = useLanguage();
  const [visible, setVisible] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="space-y-1">
      <label htmlFor={inputId} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          className={
            className ??
            "w-full rounded-lg border border-zinc-300 px-3 py-2 pr-10 dark:border-zinc-700 dark:bg-zinc-900"
          }
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? dict.common.passwordInput.hide : dict.common.passwordInput.show}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500 transition-colors hover:text-brand-violet"
        >
          {visible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M3 3l18 18" />
              <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
              <path d="M9.88 4.24A9.94 9.94 0 0 1 12 4c5 0 9.27 3.11 11 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61C4.14 8.14 2.29 10.4 1 12c1.73 3.89 6 7 11 7a9.96 9.96 0 0 0 5.11-1.41" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  fieldHeaderStyles,
  inputStyles,
  getInputWrapperClassName,
  getInputClassName,
} from "@/lib/styles";

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  title?: string;
  hint?: string;
  size?: "md" | "sm";
  suffix?: React.ReactNode;
  errorMessage?: string;
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      title,
      hint,
      size = "md",
      suffix,
      errorMessage,
      className,
      wrapperClassName,
      disabled,
      ...props
    },
    ref,
  ) => {
    const inputId = React.useId();

    return (
      <div className="space-y-1">
        {(title || hint) && (
          <div className={fieldHeaderStyles.container}>
            <label htmlFor={inputId}>
              {title && <p className={size === "sm" ? fieldHeaderStyles.titleSm : fieldHeaderStyles.title}>{title}</p>}
              {hint && <p className={size === "sm" ? fieldHeaderStyles.hintSm : fieldHeaderStyles.hint}>{hint}</p>}
            </label>
          </div>
        )}

        <div
          className={cn(
            getInputWrapperClassName({ size, hasError: !!errorMessage }),
            disabled && "opacity-50 cursor-not-allowed",
            wrapperClassName,
          )}
        >
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!errorMessage}
            aria-describedby={errorMessage ? `${inputId}-error` : undefined}
            className={cn(
              getInputClassName({ size, hasSuffix: !!suffix }),
              className,
            )}
            {...props}
          />

          {suffix && <div className={inputStyles.suffix}>{suffix}</div>}
        </div>

        {errorMessage && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="text-sm text-destructive"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
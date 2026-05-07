"use client";

import * as React from "react";
import { InputMask, InputMaskProps } from "@react-input/mask";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  fieldHeaderStyles,
  inputStyles,
  getInputWrapperClassName,
  getInputClassName,
} from "@/lib/styles";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const formatDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const parseDate = (str: string): Date | undefined => {
  if (!str || str.length < 10) return undefined;
  const match = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return undefined;
  const [, month, day, year] = match;
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  if (
    date.getFullYear() !== parseInt(year) ||
    date.getMonth() !== parseInt(month) - 1 ||
    date.getDate() !== parseInt(day)
  ) {
    return undefined;
  }
  return date;
};

export type MaskPreset = "tel" | "date" | "custom";

export interface MaskedInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "onChange" | "value"
  > {
  title?: string;
  hint?: string;
  size?: "md" | "sm";
  suffix?: React.ReactNode;
  errorMessage?: string;
  wrapperClassName?: string;
  value?: string;
  onChange?: (value: string) => void;

  preset?: MaskPreset;
  mask?: string;
  replacement?: InputMaskProps["replacement"];
  separate?: boolean;
  showMask?: boolean;
  calendarCaptionLayout?:
    | "label"
    | "dropdown"
    | "dropdown-months"
    | "dropdown-years";
}

const MASK_PRESETS: Record<
  Exclude<MaskPreset, "custom">,
  {
    mask: string;
    placeholder: string;
    replacement: InputMaskProps["replacement"];
    separate?: boolean;
  }
> = {
  tel: {
    mask: "(___) ___-____",
    placeholder: "(___) ___-____",
    replacement: { _: /\d/ },
    separate: true,
  },
  date: {
    mask: "MM/DD/YYYY",
    placeholder: "MM/DD/YYYY",
    replacement: { M: /\d/, D: /\d/, Y: /\d/ },
  },
};

export const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
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
      value,
      onChange,
      preset = "custom",
      mask,
      placeholder,
      replacement,
      separate,
      showMask = true,
      calendarCaptionLayout = "dropdown",
      onFocus,
      ...props
    },
    ref,
  ) => {
    const inputId = React.useId();
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const presetConfig = preset !== "custom" ? MASK_PRESETS[preset] : null;

    const resolvedMask = mask ?? presetConfig?.mask;
    const resolvedPlaceholder = placeholder ?? presetConfig?.placeholder;
    const resolvedReplacement = replacement ?? presetConfig?.replacement;
    const resolvedSeparate = separate ?? presetConfig?.separate;

    const isDateInput = preset === "date";
    const hasSuffix = !!suffix || isDateInput;

    const [internalValue, setInternalValue] = React.useState(value ?? "");
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
      () => {
        if (!isDateInput || !currentValue) return undefined;
        return parseDate(currentValue);
      },
    );
    const [month, setMonth] = React.useState<Date | undefined>(selectedDate);

    React.useEffect(() => {
      if (!isDateInput) return;

      const parsed = parseDate(currentValue);
      setSelectedDate(parsed);
      if (parsed) {
        setMonth(parsed);
      }
    }, [currentValue, isDateInput]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      const input = e.target as HTMLInputElement;

      setTimeout(() => {
        const val = input.value;
        const hasDigit = /\d/.test(val);

        if (!hasDigit) {
          if (isDateInput) {
            input.setSelectionRange(0, 0);
          } else if (preset === "tel") {
            input.setSelectionRange(1, 1);
          }
        }
      }, 50);

      onFocus?.(e);
    };

    const handleDateSelect = (date: Date | undefined) => {
      setSelectedDate(date);
      if (date) {
        const formatted = formatDate(date);
        if (!isControlled) {
          setInternalValue(formatted);
        }
        onChange?.(formatted);
      }
      setIsPopoverOpen(false);
    };

    const inputElement = (
      <InputMask
        ref={ref}
        id={inputId}
        disabled={disabled}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? `${inputId}-error` : undefined}
        className={cn(getInputClassName({ size, hasSuffix }), className)}
        value={currentValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        showMask={showMask}
        mask={resolvedMask}
        placeholder={resolvedPlaceholder}
        replacement={resolvedReplacement}
        separate={resolvedSeparate}
        type="text"
        {...props}
      />
    );

    const inputWrapperClassName = cn(
      getInputWrapperClassName({ size, hasError: !!errorMessage }),
      disabled && "opacity-50 cursor-not-allowed",
      wrapperClassName,
    );

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

        {isDateInput ? (
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverAnchor asChild>
              <div className={inputWrapperClassName}>
                {inputElement}

                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={disabled}
                    className="mr-3 ml-1 size-6 p-0"
                  >
                    <CalendarIcon className="size-4" />
                    <span className="sr-only">Select date</span>
                  </Button>
                </PopoverTrigger>
              </div>
            </PopoverAnchor>

            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              sideOffset={8}
            >
              <Calendar
                mode="single"
                selected={selectedDate}
                month={month}
                onMonthChange={setMonth}
                captionLayout={calendarCaptionLayout}
                onSelect={handleDateSelect}
              />
            </PopoverContent>
          </Popover>
        ) : (
          <div className={inputWrapperClassName}>
            {inputElement}
            {suffix && (
              <div className={inputStyles.suffix}>{suffix}</div>
            )}
          </div>
        )}

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

MaskedInput.displayName = "MaskedInput";

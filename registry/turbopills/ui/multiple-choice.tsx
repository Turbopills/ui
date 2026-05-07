"use client";

import * as React from "react";
import { CircleCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { getOptionClassName, fieldHeaderStyles } from "@/lib/styles";
import { ChoiceOption } from "@/lib/types";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export interface MultipleChoiceProps
  extends Omit<
    React.ComponentProps<typeof Checkbox>,
    "checked" | "onChange" | "value"
  > {
  title?: string;
  hint?: string;
  options: ChoiceOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  maxSelections?: number;
  className?: string;
  checkboxPosition?: "left" | "right";
  checkboxVariant?: "checkbox" | "icon" | "none";
  showNumbers?: boolean;
  highlightOnHover?: boolean;
  showOutlineOnSelect?: boolean;
  showFillOnSelect?: boolean;
  showShadowOnSelect?: boolean;
  allowTextSelection?: boolean;
}

export function MultipleChoice({
  title,
  hint,
  options,
  value = [],
  onChange,
  maxSelections,
  className,
  disabled,
  checkboxPosition = "right",
  checkboxVariant = "icon",
  showNumbers = false,
  highlightOnHover = true,
  showOutlineOnSelect = true,
  showFillOnSelect = false,
  showShadowOnSelect = false,
  allowTextSelection = false,
  ...checkboxProps
}: MultipleChoiceProps) {
  const groupId = React.useId();

  const noneOption = options.find((opt) => opt.none);

  const isMaxReached =
    maxSelections !== undefined && value.length >= maxSelections;

  const handleCheckedChange = (
    optionValue: string,
    checked: boolean,
    isNoneOption: boolean,
  ) => {
    if (!onChange) return;

    if (isNoneOption) {
      onChange(checked ? [optionValue] : []);
      return;
    }

    if (checked && isMaxReached) return;

    const newValues = checked
      ? [
        ...value.filter((v) => !noneOption || v !== noneOption.value),
        optionValue,
      ]
      : value.filter((v) => v !== optionValue);

    onChange(newValues);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {(title || hint) && (
        <div className={fieldHeaderStyles.container}>
          {title && <div className={fieldHeaderStyles.title}>{title}</div>}
          {hint && <p className={fieldHeaderStyles.hint}>{hint}</p>}
        </div>
      )}

      <div className="space-y-3">
        {options.map((option, index) => {
          const optionId = `${groupId}-${option.value}`;
          const isChecked = value.includes(option.value);
          const isDisabled =
            disabled || option.disabled || (isMaxReached && !isChecked);

          const renderIndicator = () => {
            return (
              <>
                <Checkbox
                  id={optionId}
                  checked={isChecked}
                  onCheckedChange={(checked) =>
                    handleCheckedChange(
                      option.value,
                      checked === true,
                      option.none === true,
                    )
                  }
                  disabled={isDisabled}
                  className={checkboxVariant !== "checkbox" ? "sr-only peer" : ""}
                  {...checkboxProps}
                />
                {checkboxVariant === "icon" && isChecked && (
                  <CircleCheck className="shrink-0 h-5.75 w-5.75 text-primary" />
                )}
              </>
            );
          };

          return (
            <div key={option.value} className="flex items-center">
              <label
                htmlFor={optionId}
                className={getOptionClassName({
                  selected: isChecked,
                  highlightOnHover,
                  showOutlineOnSelect,
                  showFillOnSelect,
                  showShadowOnSelect,
                  disabled: isDisabled,
                  allowTextSelection,
                })}
              >
                <div className="flex items-center gap-3">
                  {showNumbers && (
                    <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-muted text-sm font-medium">
                      {index + 1}
                    </span>
                  )}

                  {checkboxPosition !== "right" && renderIndicator()}

                  <div className="flex items-center gap-2">
                    <span>{option.label}</span>
                    {option.badge && (
                      <Badge className="px-2 py-1 text-sm border-none leading-5 whitespace-nowrap">
                        {option.badge}
                      </Badge>
                    )}
                  </div>
                </div>

                {checkboxPosition === "right" && renderIndicator()}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { CircleCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { getOptionClassName, fieldHeaderStyles } from "@/lib/styles";
import { ChoiceOption } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";

export type IndicatorVariant = "radio" | "icon" | "none";

export interface SingleChoiceProps
  extends Omit<React.ComponentProps<typeof RadioGroup>, "value" | "onChange"> {
  title?: string;
  hint?: string;
  options: ChoiceOption[];
  value?: string;
  onChange?: (value: string) => void;
  variant?: "default" | "cells";
  itemsPerRow?: number;
  indicatorPosition?: "left" | "right";
  indicatorVariant?: IndicatorVariant;
  showNumbers?: boolean;
  highlightOnHover?: boolean;
  showOutlineOnSelect?: boolean;
  showFillOnSelect?: boolean;
  showShadowOnSelect?: boolean;
  allowTextSelection?: boolean;
  allowDeselect?: boolean;
  onOptionClick?: (value: string) => void;
}

export function SingleChoice({
  title,
  hint,
  options,
  value,
  onChange,
  variant = "default",
  itemsPerRow,
  indicatorPosition = "right",
  indicatorVariant = "icon",
  showNumbers = false,
  highlightOnHover = true,
  showOutlineOnSelect = true,
  showFillOnSelect = false,
  showShadowOnSelect = false,
  allowTextSelection = false,
  allowDeselect = false,
  onOptionClick,
  className,
  disabled,
  ...radioGroupProps
}: SingleChoiceProps) {
  const groupId = React.useId();

  const isCells = variant === "cells";
  const effectiveIndicatorVariant = isCells ? "none" : indicatorVariant;
  const effectiveItemsPerRow =
    itemsPerRow ?? (isCells ? options.length : undefined);

  const gridColumns = (() => {
    if (!effectiveItemsPerRow) return undefined;
    if (isCells) {
      return "repeat(auto-fit, minmax(2.5rem, 3.75rem))";
    }
    return `repeat(${effectiveItemsPerRow}, 1fr)`;
  })();

  const handleValueChange = (newValue: string) => {
    onChange?.(newValue);
  };

  const handleOptionClick = (optionValue: string) => {
    if (allowDeselect && value === optionValue) {
      onChange?.("");
    }
    onOptionClick?.(optionValue);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {(title || hint) && (
        <div className={fieldHeaderStyles.container}>
          {title && <div className={fieldHeaderStyles.title}>{title}</div>}
          {hint && <p className={fieldHeaderStyles.hint}>{hint}</p>}
        </div>
      )}

      <RadioGroup
        value={value}
        onValueChange={handleValueChange}
        disabled={disabled}
        className={cn("grid gap-3", isCells && "w-full justify-start")}
        style={{
          gridTemplateColumns: gridColumns,
          maxWidth: isCells
            ? `calc(${effectiveItemsPerRow} * 3.75rem + (${effectiveItemsPerRow} - 1) * 0.75rem)`
            : undefined,
        }}
        {...radioGroupProps}
      >
        {options.map((option, index) => {
          const optionId = `${groupId}-${option.value}`;
          const isChecked = value === option.value;
          const isDisabled = disabled || option.disabled;

          const renderIndicator = () => {
            return (
              <>
                <RadioGroupItem
                  id={optionId}
                  value={option.value}
                  disabled={isDisabled}
                  className={cn(
                    effectiveIndicatorVariant !== "radio"
                      ? "sr-only peer"
                      : "group-hover/option:data-[state=checked]:ring-primary/60",
                  )}
                  onClick={() => handleOptionClick(option.value)}
                />
                {effectiveIndicatorVariant === "icon" && isChecked && (
                  <CircleCheck className="shrink-0 h-5.75 w-5.75 text-primary" />
                )}
              </>
            );
          };

          return (
            <div key={option.value} className="flex items-center">
              <label
                htmlFor={optionId}
                className={cn(
                  getOptionClassName({
                    selected: isChecked,
                    highlightOnHover,
                    showOutlineOnSelect,
                    showFillOnSelect,
                    showShadowOnSelect,
                    disabled: isDisabled,
                    allowTextSelection,
                  }),
                  effectiveIndicatorVariant === "radio" && "group/option",
                  isCells && "h-auto aspect-square text-sm justify-center text-center",
                )}
              >
                <div className="flex items-center gap-3">
                  {showNumbers && !isCells && (
                    <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-muted text-sm font-medium">
                      {index + 1}
                    </span>
                  )}

                  {indicatorPosition !== "right" && renderIndicator()}

                  <div className="flex items-center gap-2">
                    <span>{option.label}</span>
                    {!isCells && option.badge && (
                      <Badge className="px-2 py-1 text-sm border-none leading-5 whitespace-nowrap">
                        {option.badge}
                      </Badge>
                    )}
                  </div>
                </div>

                {indicatorPosition === "right" && renderIndicator()}
              </label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}

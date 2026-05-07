"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface ProgressStep {
  label?: string;
  tooltip?: string;
}

export interface ProgressProps {
  value?: number;
  animated?: boolean;
  filledClassName?: string;
  unfilledClassName?: string;
  currentClassName?: string;
  className?: string;
}

export function useProgressHelpers({
  value = 0,
  stepCount,
  highlightCurrent = false,
  animated = true,
  filledClassName,
  unfilledClassName,
  currentClassName,
}: {
  value?: number;
  stepCount: number;
  highlightCurrent?: boolean;
  animated?: boolean;
  filledClassName?: string;
  unfilledClassName?: string;
  currentClassName?: string;
}) {
  const transitionClass = animated ? "transition-all duration-500" : "";
  const clampedValue = Math.min(Math.max(value, 0), 100);

  const getStepState = (index: number) => {
    const midpoint = ((index + 0.5) / stepCount) * 100;
    const isFilled = value >= midpoint;
    const nextMidpoint = ((index + 1.5) / stepCount) * 100;
    const isCurrent = isFilled && value < nextMidpoint;
    return { isFilled, isCurrent };
  };

  const getStateClasses = (isFilled: boolean, isCurrent: boolean) => {
    if (isCurrent) {
      return cn(
        "bg-primary",
        highlightCurrent ? "ring-2 ring-primary/70" : "",
        currentClassName,
      );
    }
    return isFilled
      ? cn("bg-primary", filledClassName)
      : cn("bg-muted", unfilledClassName);
  };

  return {
    transitionClass,
    clampedValue,
    getStepState,
    getStateClasses,
  };
}

export function StepLabel({ label }: { label?: string }) {
  if (!label) return null;
  return (
    <span className="absolute top-full mt-2 text-xs text-muted-foreground whitespace-nowrap">
      {label}
    </span>
  );
}

export function WithTooltip({
  children,
  tooltip,
}: {
  children: React.ReactElement;
  tooltip?: string;
}) {
  if (!tooltip) return children;
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}

export const ProgressContainer = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    hasLabels: boolean;
  }
>(({ children, hasLabels }, ref) => {
  return (
    <div ref={ref} className={cn("relative w-full", hasLabels && "pb-6")}>
      {children}
    </div>
  );
});

ProgressContainer.displayName = "ProgressContainer";

export function renderStepsArray(
  count: number,
  steps: ProgressStep[] | undefined,
  renderItem: (index: number, step?: ProgressStep) => React.ReactNode,
) {
  return Array.from({ length: count }, (_, index) =>
    renderItem(index, steps?.[index]),
  );
}

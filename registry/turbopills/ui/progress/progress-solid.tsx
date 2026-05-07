"use client";

import { forwardRef } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
import {
  type ProgressProps,
  useProgressHelpers,
  ProgressContainer,
} from "./progress";

export const ProgressSolid = forwardRef<HTMLDivElement, Omit<ProgressProps, "currentClassName">>(
  (
    { className, value = 0, animated = true, filledClassName, unfilledClassName },
    ref,
  ) => {
    const { transitionClass, clampedValue } = useProgressHelpers({
      value,
      stepCount: 1,
      animated,
      filledClassName,
      unfilledClassName,
    });

    return (
      <ProgressContainer ref={ref} hasLabels={false}>
        <ProgressPrimitive.Root
          className={cn("relative overflow-hidden rounded-full w-full h-2", className)}
        >
          <div
            className={cn("absolute inset-0 rounded-full bg-muted", unfilledClassName)}
          />
          <div
            className={cn(
              "absolute inset-0 rounded-full bg-primary",
              transitionClass,
              animated && "duration-300",
              filledClassName,
            )}
            style={{ width: `${clampedValue}%` }}
          />
        </ProgressPrimitive.Root>
      </ProgressContainer>
    );
  },
);

ProgressSolid.displayName = "ProgressSolid";

"use client";

import { forwardRef } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
import {
  type ProgressProps,
  type ProgressStep,
  useProgressHelpers,
  ProgressContainer,
  StepLabel,
  WithTooltip,
  renderStepsArray,
} from "./progress";

export type ProgressStretchProps = ProgressProps & {
  highlightCurrent?: boolean;
  cellGap?: number;
  currentWeight?: number;
  collapsedWeight?: number;
  steps?: ProgressStep[] | number;
};

export const ProgressStretch = forwardRef<HTMLDivElement, ProgressStretchProps>(
  (
    {
      className,
      value = 0,
      animated = true,
      highlightCurrent = false,
      filledClassName,
      unfilledClassName,
      currentClassName,
      cellGap = 4,
      currentWeight = 8,
      collapsedWeight = 1,
      steps,
    },
    ref,
  ) => {
    const effectiveStepCount = Array.isArray(steps)
      ? steps.length
      : typeof steps === "number"
        ? steps
        : 4;
    const hasLabels = Array.isArray(steps) ? steps.some((s) => s.label) : false;

    const { transitionClass, getStepState, getStateClasses } =
      useProgressHelpers({
        value,
        stepCount: effectiveStepCount,
        highlightCurrent,
        animated,
        filledClassName,
        unfilledClassName,
        currentClassName,
      });

    const hasCurrentCell = Array.from(
      { length: effectiveStepCount },
      (_, i) => i,
    ).some((i) => getStepState(i).isCurrent);

    const minCellWidth = 8;

    return (
      <ProgressContainer ref={ref} hasLabels={hasLabels}>
        <ProgressPrimitive.Root
          className={cn("relative rounded-full w-full h-2", className)}
        >
          <div className="flex h-full w-full" style={{ gap: `${cellGap}px` }}>
            {renderStepsArray(
              effectiveStepCount,
              Array.isArray(steps) ? steps : undefined,
              (index, step) => {
                const { isFilled, isCurrent } = getStepState(index);

                const flexValue = hasCurrentCell
                  ? isCurrent
                    ? `${currentWeight} 1 0`
                    : `${collapsedWeight} 1 ${minCellWidth}px`
                  : `1 1 0`;

                return (
                  <div
                    key={index}
                    className="relative flex flex-col items-center"
                    style={{
                      flex: flexValue,
                      transition: animated ? "flex 500ms" : undefined,
                    }}
                  >
                    <WithTooltip tooltip={step?.tooltip}>
                      <div
                        className={cn(
                          "h-full w-full rounded-full",
                          transitionClass,
                          getStateClasses(isFilled, isCurrent),
                        )}
                      />
                    </WithTooltip>
                    <StepLabel label={step?.label} />
                  </div>
                );
              },
            )}
          </div>
        </ProgressPrimitive.Root>
      </ProgressContainer>
    );
  },
);

ProgressStretch.displayName = "ProgressStretch";
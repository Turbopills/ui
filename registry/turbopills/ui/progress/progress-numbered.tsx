"use client";

import { forwardRef, useRef, useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  type ProgressProps,
  type ProgressStep,
  useProgressHelpers,
  ProgressContainer,
  StepLabel,
  WithTooltip,
} from "./progress";

const STEP_SIZE = 32;
const STEP_GAP = 4;
const CONNECTOR_HEIGHT = 4;

export type ProgressNumberedProps = ProgressProps & {
  highlightCurrent?: boolean;
  steps?: ProgressStep[] | number;
};

function getVisibleIndices(
  total: number,
  maxSlots: number,
  activeIdx: number,
): number[] | null {
  if (total <= maxSlots) return null;

  const active = Math.max(0, Math.min(total - 1, activeIdx));
  const pinned = new Set<number>([0, total - 1, active]);

  for (let d = 1; pinned.size < maxSlots; d++) {
    if (active - d >= 0) pinned.add(active - d);
    if (pinned.size < maxSlots && active + d < total) pinned.add(active + d);
    if (active - d < 0 && active + d >= total) break;
  }

  const sorted = Array.from(pinned).sort((a, b) => a - b);

  const countEllipses = (arr: number[]) =>
    arr.reduce(
      (count, value, i) =>
        i > 0 && value - arr[i - 1] > 1 ? count + 1 : count,
      0,
    );

  while (sorted.length + countEllipses(sorted) > maxSlots && sorted.length > 2) {
    let worstIndex = -1;
    let worstDistance = -1;

    for (let i = 1; i < sorted.length - 1; i++) {
      const distance = Math.abs(sorted[i] - active);

      if (distance > worstDistance) {
        worstDistance = distance;
        worstIndex = i;
      }
    }

    if (worstIndex === -1) break;
    sorted.splice(worstIndex, 1);
  }

  return sorted;
}

export const ProgressNumbered = forwardRef<HTMLDivElement, ProgressNumberedProps>(
  (
    {
      className,
      value = 0,
      animated = true,
      highlightCurrent = false,
      filledClassName,
      unfilledClassName,
      currentClassName,
      steps,
    },
    ref,
  ) => {
    const stepCount = Array.isArray(steps)
      ? steps.length
      : typeof steps === "number"
        ? steps
        : 4;
    const stepsArray = Array.isArray(steps) ? steps : undefined;
    const hasLabels = stepsArray?.some((s) => s.label) ?? false;

    const innerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number | null>(null);

    useEffect(() => {
      const el = innerRef.current;

      if (!el) return;

      const update = () => setContainerWidth(el.offsetWidth);
      update();

      const observer = new ResizeObserver(update);
      observer.observe(el);

      return () => observer.disconnect();
    }, []);

    const { transitionClass, getStepState, getStateClasses } =
      useProgressHelpers({
        value,
        stepCount,
        highlightCurrent,
        animated,
        filledClassName,
        unfilledClassName,
        currentClassName,
      });

    const activeIdx = Math.max(
      0,
      Math.min(stepCount - 1, Math.round((value * stepCount) / 100) - 1),
    );

    const maxSlots =
      containerWidth !== null
        ? Math.floor((containerWidth + STEP_GAP) / (STEP_SIZE + STEP_GAP))
        : stepCount;

    const visibleIndices = useMemo(
      () => getVisibleIndices(stepCount, maxSlots, activeIdx),
      [stepCount, maxSlots, activeIdx],
    );

    const isCollapsed = visibleIndices !== null;

    const renderConnector = (fromIndex: number) => {
      const { isFilled } = getStepState(fromIndex + 1);
      return (
        <div
          key={`connector-${fromIndex}`}
          className={cn(
            "rounded-full self-center",
            transitionClass,
            isFilled ? "bg-primary" : "bg-muted",
          )}
          style={{ flex: "1 1 0", minWidth: 0, height: CONNECTOR_HEIGHT }}
        />
      );
    };

    const renderStep = (index: number, step?: ProgressStep) => {
      const { isFilled, isCurrent } = getStepState(index);

      return (
        <div key={index} className="relative flex flex-col items-center">
          <WithTooltip tooltip={step?.tooltip}>
            <div
              className={cn(
                "flex items-center justify-center rounded-full w-8 h-8 text-sm font-medium",
                transitionClass,
                getStateClasses(isFilled, isCurrent),
                isFilled || isCurrent
                  ? "text-primary-foreground"
                  : "text-muted-foreground",
              )}
            >
              {index + 1}
            </div>
          </WithTooltip>

          {!isCollapsed && <StepLabel label={step?.label} />}
        </div>
      );
    };

    const renderContent = () => {
      if (!isCollapsed) {
        const elements = [];
        for (let i = 0; i < stepCount; i++) {
          elements.push(renderStep(i, stepsArray?.[i]));
          if (i < stepCount - 1) {
            elements.push(renderConnector(i));
          }
        }
        return elements;
      }

      return visibleIndices.flatMap((idx, i) => {
        const prev = visibleIndices[i - 1];
        const hasGap = i > 0 && idx - prev > 1;
        const elements = [];

        if (i > 0) {
          if (hasGap) {
            elements.push(
              <div
                key={`ellipsis-${i}`}
                className="flex items-center justify-center w-8 h-8 text-sm text-muted-foreground"
              >
                …
              </div>,
            );
          } else {
            elements.push(renderConnector(prev));
          }
        }

        elements.push(renderStep(idx, stepsArray?.[idx]));
        return elements;
      });
    };

    return (
      <ProgressContainer ref={ref} hasLabels={hasLabels && !isCollapsed}>
        <div
          ref={innerRef}
          className={cn("relative flex items-center gap-1", className)}
        >
          {renderContent()}
        </div>
      </ProgressContainer>
    );
  },
);

ProgressNumbered.displayName = "ProgressNumbered";
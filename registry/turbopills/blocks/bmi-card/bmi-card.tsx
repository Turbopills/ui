"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { CircleHelp, Check } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type BMIThreshold = {
  maxBmi: number;
  isTargetRange?: boolean;
  title: string;
  description: string;
  color: string | [string, string];
  statusMessage?: {
    text: string;
    className: string;
  };
};

export const DEFAULT_BMI_THRESHOLDS: BMIThreshold[] = [
  {
    maxBmi: 0,
    title: "BMI",
    description: "Enter height and weight to calculate it.",
    color: "#e5e7eb",
  },
  {
    maxBmi: 25,
    isTargetRange: true,
    title: "Balanced",
    description: "You're in a healthy range.",
    color: ["#91f63e", "#19a349"],
    statusMessage: {
      text: "This treatment may not be for you.",
      className: "bg-[#FFEDD8] text-[#DB913C]",
    },
  },
  {
    maxBmi: 27.1,
    title: "At Risk",
    description: "You're approaching an unhealthy range.",
    color: ["#f6ac3e", "#e2e21b"],
    statusMessage: {
      text: "You may be eligible for treatment & promotional offers.",
      className: "bg-[#E1FFE2] text-[#279329]",
    },
  },
  {
    maxBmi: Infinity,
    title: "High Risk",
    description: "Excess weight may be affecting your health.",
    color: ["#f63e3e", "#ff712a"],
    statusMessage: {
      text: "You may be eligible for treatment & promotional offers.",
      className: "bg-[#E1FFE2] text-[#279329]",
    },
  },
];

export interface BMICardProps {
  bmi: number;
  minValue?: number;
  maxValue?: number;
  shape?: "circle" | "semicircle" | "arc";
  strokeWidth?: number;
  showThresholdMarkers?: boolean;
  valuePosition?: "inside" | "outside";
  fillMode?: "full" | "progress";
  animated?: boolean;
  animationDuration?: number;
  showStatusMessage?: boolean;
  tooltipContent?: React.ReactNode;
  thresholds?: BMIThreshold[];
  size?: number;
  label?: string;
  className?: string;
  showTargetMessage?: boolean;
}

const SHAPE_CONFIG = {
  circle: { degrees: 360, rotation: -90 },
  semicircle: { degrees: 180, rotation: 180 },
  arc: { degrees: 270, rotation: 135 },
} as const;

const BG_COLOR = "#e5e7eb";

function getThreshold(bmi: number, thresholds: BMIThreshold[]) {
  if (bmi <= 0) return thresholds[0];
  return thresholds.find((t) => bmi < t.maxBmi) ?? thresholds.at(-1)!;
}

function useAnimatedValue(target: number, duration: number, enabled: boolean) {
  const [value, setValue] = useState(enabled ? 0 : target);
  const frameRef = useRef<number>(undefined);

  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return;
    }

    const start = value;
    let startTime: number;

    const animate = (time: number) => {
      startTime ??= time;
      const t = Math.min(1, (time - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(start + (target - start) * eased);
      if (t < 1) frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, enabled]);

  return value;
}

export function BMICard({
  bmi,
  minValue = 5,
  maxValue = 30,
  shape = "circle",
  strokeWidth = 10,
  showThresholdMarkers = true,
  valuePosition = "inside",
  fillMode = "progress",
  animated = true,
  animationDuration = 800,
  showStatusMessage = true,
  tooltipContent =
  "Eligibility is typically BMI 30+, or 27+ with a related condition such as type 2 diabetes, high blood pressure, or high cholesterol. In some cases, people with BMI above 25 may qualify based on medical history.",
  thresholds = DEFAULT_BMI_THRESHOLDS,
  size = 132,
  label = "Your BMI",
  className,
  showTargetMessage = true,
}: BMICardProps) {
  const displayBmi = Math.max(0, bmi);

  const threshold = useMemo(
    () => getThreshold(bmi, thresholds),
    [bmi, thresholds],
  );

  const isSmall = size <= 100;

  const range = maxValue - minValue;
  const targetProgress =
    fillMode === "full"
      ? 1
      : Math.min(1, Math.max(0, (displayBmi - minValue) / range));
  const progress = useAnimatedValue(targetProgress, animationDuration, animated);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  const { degrees, rotation } = SHAPE_CONFIG[shape];
  const viewBoxHeight = shape === "semicircle" ? size / 2 + strokeWidth : size;

  const gradientId = useId();
  const isGradient = Array.isArray(threshold.color);
  const strokeColor = isGradient
    ? `url(#${gradientId})`
    : (threshold.color as string);

  const thresholdMarkers = showThresholdMarkers
    ? thresholds
      .filter((t) => t.maxBmi !== Infinity && t.maxBmi > 0)
      .map((t) => {
        const ratio = (t.maxBmi - minValue) / range;
        const angle = ((rotation + degrees * ratio) * Math.PI) / 180;
        const tickLength = strokeWidth + 4;

        const innerR = radius - tickLength / 2;
        const outerR = radius + tickLength / 2;
        return {
          x1: center + innerR * Math.cos(angle),
          y1: center + innerR * Math.sin(angle),
          x2: center + outerR * Math.cos(angle),
          y2: center + outerR * Math.sin(angle),
          bmi: t.maxBmi,
        };
      })
    : [];

  const arcLength = circumference * (degrees / 360);
  const filledLength = arcLength * progress;
  const bgDasharray = `${arcLength} ${circumference}`;
  const dasharray = `${filledLength} ${circumference}`;

  const isInTargetRange = Boolean(threshold.isTargetRange) && bmi > 0;

  return (
    <div
      className={cn(
        "w-full flex flex-col items-center gap-6 mb-10 mt-4 sm:mt-11",
        className,
      )}
    >
      <div className="flex justify-center items-center gap-6">
        <div className="relative" style={{ width: size, height: viewBoxHeight }}>
          <svg
            width={size}
            height={viewBoxHeight}
            viewBox={`0 0 ${size} ${viewBoxHeight}`}
            className="text-background"
          >
            {isGradient && (
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    stopColor={(threshold.color as [string, string])[0]}
                  />
                  <stop
                    offset="100%"
                    stopColor={(threshold.color as [string, string])[1]}
                  />
                </linearGradient>
              </defs>
            )}

            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={BG_COLOR}
              strokeWidth={strokeWidth}
              strokeDasharray={bgDasharray}
              strokeLinecap="round"
              transform={`rotate(${rotation} ${center} ${center})`}
            />

            {progress > 0 && (
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={dasharray}
                strokeLinecap="round"
                transform={`rotate(${rotation} ${center} ${center})`}
              />
            )}

            {thresholdMarkers.map((marker, i) => (
              <line
                key={i}
                x1={marker.x1}
                y1={marker.y1}
                x2={marker.x2}
                y2={marker.y2}
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              />
            ))}
          </svg>

          {valuePosition === "inside" && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ paddingTop: shape === "semicircle" ? size * 0.25 : 0 }}
            >
              <span
                className={cn(
                  "font-bold leading-none",
                  shape === "circle"
                    ? isSmall
                      ? "text-[20px]"
                      : "text-[34px]"
                    : isSmall
                      ? "text-[16px]"
                      : "text-[28px]",
                )}
              >
                {displayBmi}
              </span>
              {!isSmall && (
                <span
                  className={cn(
                    "font-semibold text-muted-foreground",
                    shape === "circle" ? "text-sm" : "text-xs",
                  )}
                >
                  {label}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold tracking-tight">{threshold.title}</h3>
            {tooltipContent && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-muted-foreground hover:text-primary transition-colors">
                    <CircleHelp className="size-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-70 p-3">
                  {tooltipContent}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <p className="text-sm text-muted-foreground max-w-37.5">
            {threshold.description}
          </p>

          {valuePosition === "outside" && (
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-medium text-muted-foreground">{label}</span>
              <span className="text-xl font-bold">{displayBmi}</span>
            </div>
          )}

          {showTargetMessage && bmi > 0 && isInTargetRange && (
            <div className="mt-2 text-sm flex items-center gap-1.5">
              <Check className="size-4 text-green-500" />
              <span className="text-green-600 font-medium">Target reached!</span>
            </div>
          )}
        </div>
      </div>

      {showStatusMessage && bmi > 0 && threshold.statusMessage && (
        <div
          className={cn(
            "text-sm px-5 py-2 rounded-md font-semibold",
            threshold.statusMessage.className,
          )}
        >
          {threshold.statusMessage.text}
        </div>
      )}
    </div>
  );
}
